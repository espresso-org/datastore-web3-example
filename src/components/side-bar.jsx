import React from 'react'
import styled from 'styled-components'
import moment from 'moment'

import { Text, Button, theme } from '@aragon/ui'

const Main = styled.aside`
  flex-shrink: 0;
  flex-grow: 0;
  width: 300px;
  margin-left: 30px;
  min-height: 100%;
`

export const SideBar = ({ file }) =>
  <Main>
    {file &&
      <div>
        <Tabs>
          Details
        </Tabs>
        

        <Details>
          <Text size="large">{file.name}</Text>
          <Info>
            <Label>Type</Label>Javascript file<br />
            <Label>Location</Label>/<br />

            <Label>Owner</Label>
            <EthAddress title={file.owner}>{file.owner}</EthAddress><br />

            <Label>Permissions</Label><br />
            <Label>Modified</Label>{moment.unix(file.lastModification.toNumber()).format('MMM D YYYY')}<br />
            <Label>File size</Label>{file.fileSize.toNumber()}<br />
          </Info>
          <Separator />

          <Actions>
            <Button mode="secondary">Rename</Button><br />
            <Button mode="secondary">Modify</Button><br />
            <Button mode="secondary">Change permissions</Button><br />
            <Button mode="outline">Delete</Button><br />
          </Actions>
        </Details>
      </div>
    }


  </Main>



const Tabs = styled.div`
  border-bottom: 1px solid ${theme.contentBorder};
  padding-bottom: 8px;
`

const Details = styled.div`
  margin-top: 20px;
`

const Info = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`

const Label = styled.span`
  display: inline-block;
  color: ${theme.textTertiary};
  width: 112px;
`

const Actions = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
`



const EthAddress = styled.span`
  max-width: 120px;
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  white-space: nowrap;
  text-overflow: ellipsis;
`


const Separator = styled.div`  
  border-bottom: 1px solid ${theme.contentBorder};
`