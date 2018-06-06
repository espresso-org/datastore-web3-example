import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'
import { AragonApp, AppBar, Button, Table, TableHeader, TableRow, TableCell, SidePanel } from '@aragon/ui'
import { FileInput } from './components/file-input'

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
          <TableRow onClick={() => this.fileClick(file.id)} key={file.id}>
            <TableCell>
              {file.name}
            </TableCell>
            <TableCell>
              {file.owner}
            </TableCell> 
            <TableCell>
            </TableCell>            
            <TableCell>
              {file.lastModification.toString()}
            </TableCell>            
          </TableRow>
        )}
        </Table>
        <SidePanel
          title="Change permissions"
          opened={false}          
        >
        </SidePanel>
    </AragonApp>

}



function downloadFile(file: ArrayBuffer, filename: string) {
  var blob = new Blob([file], {type: "application/pdf"})

  // IE doesn't allow using a blob object directly as link href
  // instead it is necessary to use msSaveOrOpenBlob
  if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob)
    return
  } 

  // For other browsers: 
  // Create a link pointing to the ObjectURL containing the blob.
  const data = window.URL.createObjectURL(blob)
  var link = document.createElement('a')
  link.href = data
  link.download=filename
  link.click()

  // For Firefox it is necessary to delay revoking the ObjectURL
  setTimeout(() => window.URL.revokeObjectURL(data), 100)  

}


function convertFileToArrayBuffer(file) {
  return new Promise((res, rej) => {

    let reader = new FileReader()

    reader.onload = function (e) {
      res(reader.result)
    }

    reader.readAsArrayBuffer(file)
  })
}




export default App
