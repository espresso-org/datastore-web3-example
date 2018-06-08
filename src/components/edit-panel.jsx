import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { SidePanel } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

export const EditPanel = observer(() => 
    <SidePanel 
        title={title(mainStore.editMode)}
        opened={mainStore.editMode !== EditMode.None}
        onClose={() => mainStore.editMode = EditMode.None}>

    </SidePanel>
)

function title(editMode) {
    switch(editMode) {
        case EditMode.None: return ''
        case EditMode.Name: return 'Change file name'
        case EditMode.Content: return 'Change file content'
        case EditMode.Permissions: return 'Add/Remove permissions'
    }
}