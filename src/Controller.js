import React, { useEffect, useState } from "react";
import { Button, Card, Checkbox, Text } from "@nextui-org/react";
import { DeleteOutlined } from "@mui/icons-material";

export default function Controller({ list, setList }) {
  const [active, setActive] = useState(0);

  const toggleMark = (inx) => {
    let updatedTasks = [...list];

    updatedTasks[inx].is_done = !updatedTasks[inx].is_done;

    setList(updatedTasks);
  };

  useEffect(() => {
    console.log(list);
  }, [list]);

  const deleteTask = (inx) => {
    if (list.length === 1) {
      setList([]);
    } else {
      let updatedTasks = [...list];
      updatedTasks.splice(inx, 1);
      setList(updatedTasks);
    }
  };
  function Tabs() {
    const elems = [];
    const items = ["All", "Pending", "Completed"];
    const colors = ["secondary", "warning", "success"];
    for (let i in items) {
      elems.push(
        <Button
          flat={active == i}
          bordered={active != i}
          size="sm"
          color={colors[i]}
          key={i}
          onPress={(e) => {
            setActive(i);
          }}
        >
          {items[i]}
        </Button>
      );
    }
    return (
      <div style={{ display: "flex", gap: "0.45rem", flexDirection: "row" }}>
        {elems}
      </div>
    );
  }
  function TaskList() {
    const elems = [];
    if (list.length == 0) return "No Tasks";
    let tmpList = [...list];

    for (let i = 0; i < tmpList.length; i++) {
      const elem = (
        <Card key={i} variant="bordered">
          <Card.Header style={{ justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", gap: "0.8rem", alignItems: "center" }}
            >
              <Checkbox
                isRounded
                defaultSelected={tmpList[i].is_done}
                onChange={(e) => {
                  // console.log(i);

                  toggleMark(i);
                }}
              />
              <Text b size={18}>
                {tmpList[i].title}
              </Text>
            </div>
          </Card.Header>
          <Card.Divider />
          <Card.Body>{tmpList[i].desc}</Card.Body>
          <Card.Divider />
          <Card.Body>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                {tmpList[i].deadline && (
                  <Text b size={14} color={"error"}>
                    Due Date:
                    <Card.Divider />
                    {tmpList[i].deadline}
                  </Text>
                )}
              </div>
              <div>
                <Button
                  color={"error"}
                  onPress={(e) => {
                    deleteTask(i);
                  }}
                  flat
                  style={{
                    minHeight: "1rem",
                    minWidth: "1rem",
                    height: "2rem",
                    width: "2rem",
                    padding: "0.4rem",
                  }}
                >
                  <DeleteOutlined />
                </Button>
              </div>
            </div>
          </Card.Body>
        </Card>
      );
      if (!tmpList[i].is_done) {
        if (active != 2) {
          elems.push(elem);
        }
      }
      if (tmpList[i].is_done) {
        if (active != 1) {
          elems.push(elem);
        }
      }
    }

    return elems;
  }
  return (
    <>
      <Tabs />
      <br />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5,1fr)",
          gap: "0.8rem",
        }}
      >
        <TaskList />
      </div>
    </>
  );
}