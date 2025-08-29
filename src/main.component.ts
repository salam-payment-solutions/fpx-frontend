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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectItemText,
    SelectLabel,
    SelectScrollDownButton,
    SelectScrollUpButton,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
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
    app.component('Select', Select)
    app.component('SelectContent', SelectContent)
    app.component('SelectGroup', SelectGroup)
    app.component('SelectItem', SelectItem)
    app.component('SelectItemText', SelectItemText)
    app.component('SelectLabel', SelectLabel)
    app.component('SelectScrollDownButton', SelectScrollDownButton)
    app.component('SelectScrollUpButton', SelectScrollUpButton)
    app.component('SelectSeparator', SelectSeparator)
    app.component('SelectTrigger', SelectTrigger)
    app.component('SelectValue', SelectValue)
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
