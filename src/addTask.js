import { Button, Input, Modal, Text, Textarea } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function AddTask({ setList }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const currentDate = new Date().toISOString().split('T')[0];
  const dateChange = (event) =>{
    const selectedDate = event.target.value;
    setDate(selectedDate);
  }

  /*
   => if user choose past date then alert will show up of invalid due date.
  
  // const dateChange = (event) => {
  //   const selectedDate = event.target.value;
  //   if (selectedDate >= currentDate) setDate(selectedDate);
  //   else alert('Invalid due date. Please select a date greater than or equal to the current date.');
  // }

  */
  const TitleChange = (event) => {
    if(event.target.value === '') setTitle('');
    else setTitle(event.target.value);
  };

  const DescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const addTask = () => {
    if (title.trim() === '' || description.trim() === '') {
      alert("Please fill out both fields");
    }

    const newTask = {
      ts: new Date().toLocaleString(),
      title: title,
      desc: description,
      deadline: date,
      is_done: false,
    };

    setList((preList) => ([...preList, newTask]));
    setTitle('');
    setDescription('');
    setOpen(false);
  };
  return (<>
    <Button onPress={() => setOpen(true)}>Add Task</Button>
    <br />
    <Modal blur open={open} onClose={() => { setOpen(false) }} closeButton>
      <Modal.Header>
        <Text b size={18}>Add New Task</Text>
      </Modal.Header>
      <Modal.Body>
        <Input required clearable type="text" id="title" value={title} onChange={TitleChange} placeholder="Enter Title" label="Title" />

        <Textarea
          clearable
          required
          label="Description"
          type="text"
          id="description"
          placeholder="Enter Description"
          value={description}
          onChange={DescriptionChange} 
        />

        <label >Select date</label>
        <Input
          type="date"
          value={date}
          placeholder = {currentDate}
          onChange={dateChange}
          min = {currentDate} // added for disabling past dates
        />


      </Modal.Body>
      <Modal.Footer>

        <Button auto flat color="error" onPress={() => setOpen(false)}>
          Close
        </Button>

        <Button auto onClick={addTask}>
          Add Task
        </Button>
      </Modal.Footer>
    </Modal>
  </>)

}