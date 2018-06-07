import React, { Component } from 'react'
import getWeb3 from './utils/getWeb3'
import styled from 'styled-components'
import { AragonApp, AppBar, Button, Table, TableHeader, TableRow, TableCell, SidePanel } from '@aragon/ui'
import { FileInput } from './components/file-input'
import { FileRow } from './components/file-row'

import { AppLayout } from './components/app-layout'
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
      <AppLayout.ScrollWrapper>
        <AppLayout.Content>
          <Breadcrumb>Documents</Breadcrumb>
          <TwoPanels>
            <Main>
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
            </Main>
            <SideBar>
              feawf
            </SideBar>
          
          </TwoPanels>
        </AppLayout.Content>
      </AppLayout.ScrollWrapper>

      <SidePanel
        title="Change permissions"
        opened={false}          
      >
      </SidePanel>
    </AragonApp>

}

const Breadcrumb = styled.div`
  font-size: 21px;
  color: #000;
  margin: 20px 0;
`

const Main = styled.div`
  width: 100%;
`
const TwoPanels = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
`

const SideBar = styled.aside`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  margin-left: 30px;
  min-height: 100%;
`




export default App
