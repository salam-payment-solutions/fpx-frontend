/* eslint-disable vue/no-reserved-component-names */
/* eslint-disable vue/multi-word-component-names */
import { ErrorMessage, Field, Form } from 'vee-validate'
import type { App } from 'vue'
import { Input } from './components/ui/input'
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from './components/ui/number-field'
import {
    ShadSelect,
    ShadSelectContent,
    ShadSelectGroup,
    ShadSelectItem,
    ShadSelectItemText,
    ShadSelectLabel,
    ShadSelectScrollDownButton,
    ShadSelectScrollUpButton,
    ShadSelectSeparator,
    ShadSelectTrigger,
    ShadSelectValue,
} from './components/ui/select'
import { Checkbox } from './components/ui/checkbox'
import { Button } from './components/ui/button'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from './components/ui/form'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationFirst,
    PaginationItem,
    PaginationLast,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

export const RegisterComponent = (app: App<Element>) => {
    app.component('Button', Button)
    app.component('Checkbox', Checkbox)
    app.component('ErrorMessage', ErrorMessage)
    app.component('Field', Field)
    app.component('Form', Form)
    app.component('FormControl', FormControl)
    app.component('FormDescription', FormDescription)
    app.component('FormField', FormField)
    app.component('FormItem', FormItem)
    app.component('FormLabel', FormLabel)
    app.component('FormMessage', FormMessage)
    app.component('Input', Input)
    app.component('NumberField', NumberField)
    app.component('NumberFieldContent', NumberFieldContent)
    app.component('NumberFieldDecrement', NumberFieldDecrement)
    app.component('NumberFieldIncrement', NumberFieldIncrement)
    app.component('NumberFieldInput', NumberFieldInput)
    app.component('ShadSelect', ShadSelect)
    app.component('ShadSelectContent', ShadSelectContent)
    app.component('ShadSelectGroup', ShadSelectGroup)
    app.component('ShadSelectItem', ShadSelectItem)
    app.component('ShadSelectItemText', ShadSelectItemText)
    app.component('ShadSelectLabel', ShadSelectLabel)
    app.component('ShadSelectScrollDownButton', ShadSelectScrollDownButton)
    app.component('ShadSelectScrollUpButton', ShadSelectScrollUpButton)
    app.component('ShadSelectSeparator', ShadSelectSeparator)
    app.component('ShadSelectTrigger', ShadSelectTrigger)
    app.component('ShadSelectValue', ShadSelectValue)
    app.component('Table', Table)
    app.component('TableBody', TableBody)
    app.component('TableCaption', TableCaption)
    app.component('TableCell', TableCell)
    app.component('TableHead', TableHead)
    app.component('TableHeader', TableHeader)
    app.component('TableRow', TableRow)
    app.component('Pagination', Pagination)
    app.component('PaginationContent', PaginationContent)
    app.component('PaginationEllipsis', PaginationEllipsis)
    app.component('PaginationFirst', PaginationFirst)
    app.component('PaginationLast', PaginationLast)
    app.component('PaginationItem', PaginationItem)
    app.component('PaginationNext', PaginationNext)
    app.component('PaginationPrevious', PaginationPrevious)
}
