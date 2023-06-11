import {useAppSelector} from "@/stores";
import {useDeleteFirstCategoryMutation} from "@/stores/slices/admin.api";
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

export const DeleteFirstCategory = () => {
  const firstCategory = useAppSelector(
    (state) => state.category.category
  );
  const [deleteFirstCategory] = useDeleteFirstCategoryMutation();
  const {register, handleSubmit, formState: {errors}, reset, control} = useForm<{id: string}>();

  const onSubmit = async (formData) => {s

    try {
      await deleteFirstCategory(formData);
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
