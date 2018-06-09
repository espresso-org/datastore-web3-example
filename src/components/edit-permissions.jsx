import React, { Component } from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { Field, Button, TextInput } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

const Main = styled.div`
    
`


@observer
export class EditPermissions extends Component {

  state = { newAddress: '' }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Main>
          <Field label="Entity address:">
            <TextInput value={this.state.newAddress} onChange={e => this.setState({ newAddress: e.target.value })} />
            <AddButton onClick={() => mainStore.addWritePermission(this.props.file.id, this.state.newAddress)}>Add</AddButton>
            <RemoveButton onClick={() => mainStore.removeWritePermission(this.props.file.id, this.state.newAddress)}>Remove</RemoveButton>
          </Field>
          <AddressList>
            {this.props.file.permissionAddresses.map(address => 
              <Address key={address}>{address}</Address>
            )}
          </AddressList>
          <Actions>            
            <ActionButton mode="outline" onClick={() => mainStore.setFilename(this.props.file.id, this.state.newFilename)} emphasis="positive">OK</ActionButton>
            <ActionButton mode="outline" onClick={() => mainStore.setEditMode(EditMode.None)} emphasis="negative">Cancel</ActionButton>
          </Actions>
      </Main>
    )
  }
}

const AddButton = styled(Button).attrs({ 
    compact: true, 
    mode: 'outline', 
    emphasis: 'positive' 
  })`
  display: inline-block;
  margin: 0px 4px;
`

const RemoveButton = styled(Button).attrs({ 
  compact: true, 
  mode: 'outline', 
  emphasis: 'negative' 
})`
display: inline-block;
margin: 0px;
`

const AddressList = styled.div`
  margin-top: 12px;
`

const Address = styled.div`
`


const Actions = styled.div`
  margin-top: 40px;
  margin-bottom: 20px;
`

const ActionButton = styled(Button)`
  display: inline-block;
  margin: 8px 10px;
`