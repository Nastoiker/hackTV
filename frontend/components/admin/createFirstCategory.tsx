import {useForm} from "react-hook-form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useCreateCategoryMutation} from "@/stores/slices/admin.api";
interface ICreateFirstCategory {
 name: string;
 alias: string;
}
export const CreateFirstCategoryComponent = (): JSX.Element => {
  const {register, handleSubmit, formState: {errors}, reset} = useForm<ICreateFirstCategory>();
  const [createFirstCategory, data] = useCreateCategoryMutation();
  const onSubmit = async (formData: ICreateFirstCategory) => {
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
    <Button>Создать категорию</Button>
   </form>
}
