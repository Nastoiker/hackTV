import {useAppSelector} from "@/stores";
import {useDeleteFirstCategoryMutation, useDeleteSecondCategoryMutation} from "@/stores/slices/admin.api";
import {Controller, useForm} from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

export const DeleteSecondCategoryComponent = () => {
  const secondCategory = useAppSelector(
    (state) => state.category.category
  ).flatMap(obj => obj.secondLevelCategory);
  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<{id: string }>();
  const [deleteSecondCategory] = useDeleteSecondCategoryMutation();

  const onSubmit = async (formData) => {

    try {
      await deleteSecondCategory(formData);
      reset();
    } catch {
    }
  }
  return <form onSubmit={handleSubmit(onSubmit)}>
    <Controller
      name={"id"}
      control={control}
      render={({ field: { onChange, value,ref } }) => {

        return (
          <Select  onValueChange={onChange}>
            <SelectTrigger className="w-[180px] ">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent className={''}>
              <SelectGroup>
                <SelectLabel>Вторая категория</SelectLabel>
                {secondCategory.map(s2 => <SelectItem key={s2.id}  value={s2.id}>{s2.name}</SelectItem>)}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}}
    />
    <Button>Создать категорию</Button>
  </form>
}
