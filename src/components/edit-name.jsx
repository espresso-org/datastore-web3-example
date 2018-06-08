import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { Field, Button, TextInput } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

const Main = styled.div`
    
`

export const EditName = observer(() =>
  <Main>
      <Field label="Enter name here:">
        <TextInput placeholder={mainStore.selectedFile.name} />
      </Field>
  </Main>
)


