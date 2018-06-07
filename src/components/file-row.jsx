import React, { Component } from 'react'
import styled from 'styled-components'
import { TableRow, TableCell } from '@aragon/ui'
import { getClassNameForFilename } from '../utils/file-icons'
import moment from 'moment'


const Container = styled(TableRow)`
  cursor: pointer;
`

const EthAddress = styled.div`
  max-width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`


export const FileRow = ({ file, onClick }) => 
  <Container {...{ onClick }}>
    <TableCell>
      <div><i className={`fa ${getClassNameForFilename(file.name)}`} /> {file.name}</div>
    </TableCell>
    <TableCell>
      <EthAddress title={file.owner}>{file.owner}</EthAddress> 
    </TableCell>
    <TableCell>
    </TableCell>            
    <TableCell>
      {moment.unix(file.lastModification.toNumber()).format('YYYY-MM-DD')}
    </TableCell>            
  </Container>



