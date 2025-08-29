/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { ErrorMessage } from 'vee-validate'
import type { App } from 'vue'
import * as UIInput from './components/ui/input'
import * as UINumberField from './components/ui/number-field'
import * as UISelect from './components/ui/select'
import * as UICheckbox from './components/ui/checkbox'
import * as UIButton from './components/ui/button'
import * as UIForm from './components/ui/form'
import * as UITable from '@/components/ui/table'
import * as UIPagination from '@/components/ui/pagination'
import * as UIPopover from '@/components/ui/popover'
import * as UICommand from '@/components/ui/command'
import * as UIBadge from '@/components/ui/badge'

export const RegisterComponent = (app: App<Element>) => {
    // Register vee-validate components
    app.component('ErrorMessage', ErrorMessage)

    // Register UI components in batch
    const components = [
        UIInput,
        UINumberField,
        UISelect,
        UICheckbox,
        UIButton,
        UIForm,
        UITable,
        UIPagination,
        UIPopover,
        UICommand,
        UIBadge,
    ]
    components.forEach((group) => {
        Object.entries(group).forEach(([name, comp]) => {
            app.component(name, comp)
        })
    })
}
