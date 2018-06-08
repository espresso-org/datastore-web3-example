import { observable, computed } from 'mobx'

import { downloadFile, convertFileToArrayBuffer } from '../utils/files'
import getWeb3 from '../utils/getWeb3'
import { Datastore, providers } from 'datastore'


class MainStore {

  @observable files = []
  @observable selectedFile

  isFileSelected(file) {
    return this.selectedFile && this.selectedFile.id === file.id
  }

  uploadFiles = async e => {
    const files = e.target.files

    for (let file of files) {
      const result = await convertFileToArrayBuffer(file)
      await this.dataStore.addFile(file.name, result)
    }

  }

  downloadFile = async fileId => {
    const file = await this.dataStore.getFile(fileId)
    downloadFile(file.content, file.name)
  }

  selectFile = async fileId => {
    const selectedFile = mainStore.files.filter(file => file && file.id === fileId)[0]
    console.log('selectedFile: ', selectedFile)
    if (selectedFile)
      mainStore.selectedFile = selectedFile
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