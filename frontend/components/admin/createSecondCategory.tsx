

import {Controller, useForm} from "react-hook-form";
import {useCreateSecondCategoryMutation} from "@/stores/slices/admin.api";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {useAppSelector} from "@/stores";
interface ICreateSecondCategory {
  name: string,
  alias: string,
  firstLevelId: string,
}
export const CreateSecondCategory = (): JSX.Element => {
  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<ICreateSecondCategory>();
  const [createFirstCategory, data] = useCreateSecondCategoryMutation();
  const firstCategory = useAppSelector(
    (state) => state.category.category
  );
  const onSubmit = async (formData: ICreateSecondCategory) => {
    try {
      await createFirstCategory(formData);
      reset();
    } catch {

    }
  }
  return <form onSubmit={handleSubmit(onSubmit)}>
    <Input placeholder={'Введите название категории'} {...register('name')}/>
    <Input error={errors.alias} placeholder={' Введите alias '} {...register('alias', {
      pattern: {
        value: /^[A-Za-z][A-Za-z0-9]*$/,
        message: 'Введите только английские символы'
      }
    })} />
    <Controller
      name={"firstLevelId"}
      control={control}
      render={({ field: { onChange, value,ref } }) => {

        return (
          <Select  onValueChange={onChange}>
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Категории</SelectLabel>
              {firstCategory.map(s2 => <SelectItem key={s2.id}  value={s2.id}>{s2.name}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}}
    />
    <Button>Создать категорию</Button>
  </form>
}
