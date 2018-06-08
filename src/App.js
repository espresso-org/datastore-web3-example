import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { AragonApp, AppBar, Table, TableHeader, TableRow, SidePanel } from '@aragon/ui'

import { AppLayout } from './components/app-layout'
import { FileInput } from './components/file-input'
import { FileRow } from './components/file-row'
import { SideBar } from './components/side-bar'

import { mainStore } from './stores/main-store'

import './App.css'


const App = observer(() =>
  <AragonApp publicUrl="/drive/">
    <AppBar
      title="Drive + web3"
      endContent={
        <FileInput onChange={mainStore.uploadFiles} >New File</FileInput>
      }
    />
    <AppLayout.ScrollWrapper>
      <AppLayout.Content>
        <Breadcrumb>/</Breadcrumb>
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
              {mainStore.files.toJS().map(file => 
                file && <FileRow
                          key={file.id}
                          file={file}
                          selected={mainStore.isFileSelected(file)}
                          onClick={() => mainStore.selectFile(file.id)}
                        />
              )}
              
            </Table>
          </Main>

          <SideBar file={mainStore.selectedFile} />

        </TwoPanels>
      </AppLayout.Content>
    </AppLayout.ScrollWrapper>

    <SidePanel
      title="Change permissions"
      opened={false}
    >
    </SidePanel>
  </AragonApp>
)

const Breadcrumb = styled.div`
  font-size: 21px;
  color: #000;`

const Main = styled.div`
  width: 100%;
`
const TwoPanels = styled.div`
  display: flex;
  width: 100%;
  min-width: 800px;
`


export default App
