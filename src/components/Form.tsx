import { FormEvent, useEffect, useState } from 'react';
import useForm from '../hooks/useForm';
import useTodo from '../hooks/useTodo';
import Button from '../ui/Button';
import Input from '../ui/Input';

type props = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

type useFormProps = {
  id: string;
  title: string;
  desc?: string;
  completed: boolean;
};

const Form = ({ setModal }: props) => {
  const { addTodo, todoState, resetEdit, addTodoEdited } = useTodo();
  const { edit } = todoState;
  const [btnblocker, setBtnBlocker] = useState<boolean>(true);
  const { data, handleChange } = useForm<useFormProps>({
    id: edit[0] ? edit[0].id : Math.random().toString(36).slice(2),
    title: edit[0] ? edit[0].title : '',
    desc: edit[0] && edit[0].desc,
    completed: edit[0] ? edit[0].completed : false,
  });
  useEffect(() => {
    [data.title].includes('') ? setBtnBlocker(true) : setBtnBlocker(false);
  }, [data.title, data.desc]);
  const closeModal = () => {
    setModal((state) => !state);
    resetEdit();
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (edit[0]) {
      addTodoEdited(data);
    } else {
      addTodo(data);
    }
    closeModal();
  };
  return (
    <form onSubmit={handleSubmit} className="py-6 flex flex-col sm:p-6">
      <Input
        type="text"
        styles="p-3 outline-none shadow-md rounded-md mb-3 text-gray-700 mx-5 max-w-xs sm:mx-0"
        name="title"
        placeholder="Input a todo title"
        handleChange={handleChange}
        value={data.title}
      />
      <Input
        type="text"
        styles="p-3 w-96 outline-none shadow-md rounded-md mb-3 text-gray-700 mx-5 max-w-xs sm:mx-0"
        name="desc"
        placeholder="Input a todo description"
        handleChange={handleChange}
        value={data.desc}
      />
      <div className="flex mt-2 flex-col sm:flex-row">
        <Button
          type="button"
          value="Close"
          styles="bg-red-400 w-full text-gray-100 shadow-md rounded-md p-3 w-80 m-auto mb-2 sm:w-full sm:mr-3 sm:mb-0"
          action={closeModal}
        />
        <Button
          type="submit"
          value="Add"
          styles={` w-full text-gray-100 shadow-md rounded-md p-3 w-80 m-auto sm:w-full  ${
            !btnblocker ? 'bg-green-400' : 'bg-gray-300'
          }`}
          disabled={btnblocker}
        />
      </div>
    </form>
  );
};

export default Form;
