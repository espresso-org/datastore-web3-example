import React, { Component } from 'react'
import styled from 'styled-components'

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
        Details

        Name: {file.name}
      </div>
    }


  </Main>