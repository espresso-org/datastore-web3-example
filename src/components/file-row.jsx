import React, { Component } from 'react'
import styled from 'styled-components'
import { TableRow, TableCell } from '@aragon/ui'
import { getClassNameForFilename } from '../utils/file-icons'


export const FileRow = ({ file, onClick }) => 
  <TableRow onClick={onClick}>
    <TableCell>
      <i className={`fa ${getClassNameForFilename(file.name)}`} /> {file.name}
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