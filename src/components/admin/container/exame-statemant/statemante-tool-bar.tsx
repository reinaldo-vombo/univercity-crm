
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Selector from "@/components/shared/selector";
import { useFormContext } from "react-hook-form";
import { ExamStatementFormValues } from "@/lib/validation/exame-statemant";
import { TCourse, TDepartemant, TDiscipline, TOfferedCourseSection } from "@/types/global";

interface Props {
  departments: TDepartemant[]
  course: TCourse[]
  disciplines: TDiscipline[]
  sections: TOfferedCourseSection[]
}
const contex = [
  { id: '1', label: 'Exame de acesso', value: 'ADMISSION' },
  { id: '2', label: 'Exame de curso', value: 'COURSE' },
]
const EXAME_TYPE = [
  { id: '1', label: 'Frequencia', value: 'FREQUENCI' },
  { id: '2', label: 'Recurso', value: 'RETAKE' },
  { id: '3', label: 'Recuperacao', value: 'SPECIAL' },
]
const VARIANT = [
  { id: '1', label: 'Variante A', value: 'A' },
  { id: '2', label: 'Variante B', value: 'B' },
  { id: '3', label: 'Variante C', value: 'C' },
]
const StatementToolbar = ({ course, departments, disciplines, sections }: Props) => {
  const { control, setValue } = useFormContext<ExamStatementFormValues>();
  const couses = course.map((item) => ({
    id: item.id,
    value: item.id,
    label: item.title
  }))
  const department = departments.map((item) => ({
    id: item.id,
    value: item.id,
    label: item.title
  }))
  const discipline = disciplines.map((item) => ({
    id: item.id,
    value: item.id,
    label: item.name
  }))
  const section = sections.map((item) => ({
    id: item.id,
    value: item.id,
    label: item.title
  }))
  return (
    <div>
      <div className="space-y-10">
        <FormField
          control={control}
          name="context"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contexto do Exame</FormLabel>
              <FormControl>
                <Selector
                  formField={field}
                  options={contex}
                  placeholder="Ex: Exame de acesso, Exame de curso"

                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Exame</FormLabel>
              <FormControl>
                <Selector
                  formField={field}
                  options={EXAME_TYPE}
                  placeholder="Ex: Frequencia, Recurso, Recuprecao"

                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="variant"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variante</FormLabel>
              <FormControl>
                <Selector
                  formField={field}
                  options={VARIANT}
                  placeholder="Ex: A, B, C..."

                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="offeredCourseSectionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Turma</FormLabel>
              <FormControl>
                <Selector
                  formField={{
                    ...field,
                    onChange: (value: string) => {
                      field.onChange(value);
                      const selected = sections.find((d) => d.id === value);
                      setValue("section", selected?.title ?? "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    },
                  }}
                  options={section}
                  placeholder="Ex: LCC, LET, LJ"

                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="disciplineId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Disciplina</FormLabel>
              <FormControl>
                <Selector
                  // formField={field}
                  formField={{
                    ...field,
                    onChange: (value: string) => {
                      field.onChange(value);
                      const selected = disciplines.find((d) => d.id === value);
                      setValue("discipline", selected?.name ?? "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    },
                  }}
                  options={discipline}
                  placeholder="Ex: Matematica Discreta, Fisica"

                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="academicDepartmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departamento</FormLabel>
              <FormControl>
                <Selector
                  formField={{
                    ...field,
                    onChange: (value: string) => {
                      field.onChange(value);
                      const selected = departments.find((d) => d.id === value);
                      setValue("department", selected?.title ?? "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    },
                  }}
                  options={department}
                  placeholder="Ex: Departamento Ciência E Tecnologia"
                  className="w-full"
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Curso</FormLabel>
              <FormControl>
                <Selector
                  formField={{
                    ...field,
                    onChange: (value: string) => {
                      field.onChange(value);
                      const selected = course.find((d) => d.id === value);
                      setValue("course", selected?.title ?? "", {
                        shouldValidate: true,
                        shouldDirty: true,
                      });
                    },
                  }}
                  options={couses}
                  placeholder="Ex: Recurso Humano, Jornalismo"
                  className="w-full"
                  {...field}
                />
              </FormControl>
              <FormDescription>Opcional</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

    </div>
  )
}

export default StatementToolbar;
