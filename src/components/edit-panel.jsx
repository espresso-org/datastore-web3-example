import React from 'react'
import styled from 'styled-components'
import { observer } from 'mobx-react'

import { SidePanel } from '@aragon/ui'

import { mainStore, EditMode } from '../stores/main-store'

export const EditPanel = observer(() => 
    <SidePanel 
        title="Change permissions"
        opened={mainStore.editMode !== EditMode.None}
        onClose={() => mainStore.editMode = EditMode.None}>

    </SidePanel>
)