import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { Field, Button, TextInput } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

const Main = styled.div`
    
`



export const EditName = observer(() =>
  <Main>
      <Field label="New file name:">
        <TextInput value={mainStore.selectedFile.name} />
      </Field>
      <Actions>
        <ActionButton mode="outline" onClick={() => /* TODO */0} emphasis="positive">OK</ActionButton>
        <ActionButton mode="outline" onClick={() => mainStore.setEditMode(EditMode.None)} emphasis="negative">Cancel</ActionButton>
      </Actions>
  </Main>
)

const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`