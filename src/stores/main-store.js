import { observable, computed, action } from 'mobx'

import { downloadFile, convertFileToArrayBuffer } from '../utils/files'
import getWeb3 from '../utils/getWeb3'
import { Datastore, providers } from 'datastore'

export const EditMode = {
  None: "None",
  Name: "Name",
  Content: "Content",
  Permissions: "Permissions"
}

class MainStore {

  @observable files = []
  @observable selectedFile
  @observable editMode = EditMode.None

  isFileSelected(file) {
    return this.selectedFile && this.selectedFile.id === file.id
  }

  @action setEditMode(mode) {
    this.editMode = mode
  }

  @action async setFilename(fileId, newName) {
    await this._datastore.setFilename(fileId, newName)
    this.setEditMode(EditMode.None)
  }

  async uploadFiles(files) {
    // TODO: Add warning when there are multiple files

    for (let file of files) {
      const result = await convertFileToArrayBuffer(file)
      await this._datastore.addFile(file.name, result)
    }
  }

  async addWritePermission(fileId, address) {
    await this._datastore.setWritePermission(fileId, address, true)
  }

  async setFileContent(fileId, fileContent) {
    await this._datastore.setFileContent(fileId, fileContent) 
    this.setEditMode(EditMode.None)
  }

  downloadFile = async fileId => {
    const file = await this._datastore.getFile(fileId)
    downloadFile(file.content, file.name)
  }

  selectFile = async fileId => {
    if (this.selectedFile && this.selectedFile.id === fileId) 
      return this.selectedFile = null    

    const selectedFile = this.files.filter(file => file && file.id === fileId)[0]
    
    if (selectedFile)
      this.selectedFile = selectedFile
  }

  _datastore

  constructor() {
    this.initialize()
    window.mainStore = this
  }

  async initialize() {
    const results = await getWeb3

    this._datastore = new Datastore({
      storageProvider: new providers.storage.Ipfs(),
      encryptionProvider: new providers.encryption.Aes(),
      rpcProvider: new providers.rpc.Web3(results.web3)
    })

    this._refreshFiles()
  }

  async _refreshFiles() {
    this.files = await this._datastore.listFiles()
    console.log('files: ', this.files)
  }

}

export const mainStore = new MainStore()