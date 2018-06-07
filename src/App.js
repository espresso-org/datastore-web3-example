import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'
import { AragonApp, AppBar, Button, Table, TableHeader, TableRow, TableCell, SidePanel } from '@aragon/ui'
import { FileInput } from './components/file-input'
import { FileRow } from './components/file-row'

import { downloadFile, convertFileToArrayBuffer } from './utils/files'
import { getClassNameForFilename } from './utils/file-icons'

function getIcon(filename) {
  return getClassNameForFilename(filename).replace('-o', '')
}



import { Datastore, providers } from 'datastore'

import './App.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      files: []
    }

  }

  async componentWillMount() {

    try {
      const results = await getWeb3

      this.dataStore = new Datastore({
        storageProvider: new providers.storage.Ipfs(),
        encryptionProvider: new providers.encryption.Aes(),
        rpcProvider: new providers.rpc.Web3(results.web3)
      })

      const files = await this.dataStore.listFiles()
      this.setState({ files })
 
      window.dataStore = this.dataStore

    } catch (e) {
      console.log('Error ', e)
    }


  }

  uploadFiles = async e => {
    console.log('awef')
    const files = e.target.files

    for (let file of files) {      
      const result = await convertFileToArrayBuffer(file)      
      await this.dataStore.addFile(file.name, result)        
    }  

  }

  fileClick = async fileId => {
    const file = await this.dataStore.getFile(fileId)
    downloadFile(file.content, file.name)
  }


  render = () =>
    <AragonApp publicUrl="/drive/">
      <AppBar
        title="Drive + web3"
        
        endContent={
          <FileInput onChange={this.uploadFiles} >New File</FileInput>
        }
      />

        <Table
          header={
            <TableRow>
              <TableHeader title="Name" />
              <TableHeader title="Owner" />
              <TableHeader title="Permissions" />
              <TableHeader title="Last Modified" />
            </TableRow>
          }
        >
        {this.state.files.map(file =>
          <FileRow key={file.id} file={file} onClick={() => this.fileClick(file.id)} />
        )}
        </Table>
        <SidePanel
          title="Change permissions"
          opened={false}          
        >
        </SidePanel>
    </AragonApp>

}








export default App
