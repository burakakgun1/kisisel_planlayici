import React, { useState } from "react";
import { Modal, Form, Input, Button, Checkbox, notification } from "antd";
import axios from "axios";
import moment from "moment";
import "./addTaskForm.css";

const AddTaskForm = ({ visible, onCancel, onAdd }) => {
  const [newTask, setNewTask] = useState({
    isin_adi: "",
    zorunluluk: false,
    is_tanimi: "",
    bas_tarih: "",
    bas_saat: "",
    bitis_tarih: "",
    bitis_saat: "",
    durum: false,
  });

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setNewTask((prev) => ({ ...prev, [name]: checked }));
  };

  const handleAddTask = () => {
    const newTaskData = {
      isin_adi: newTask.isin_adi,
      zorunluluk: newTask.zorunluluk === "Evet" ? "1" : "0",
      is_tanimi: newTask.is_tanimi,
      bas_tarih: moment(newTask.bas_tarih).format("DD.MM.YYYY"),
      bas_saat: moment(newTask.bas_saat, "HH:mm").format("HH:mm:ss"),
      bitis_tarih: moment(newTask.bitis_tarih).format("DD.MM.YYYY"),
      bitis_saat: moment(newTask.bitis_saat, "HH:mm").format("HH:mm:ss"),
      durum: newTask.durum === "Tamamlandı" ? "1" : "0",
    };

    axios({
      method: "post",
      url: "url",
      data: [Object.values(newTaskData)],
    })
      .then((response) => {
        onAdd(newTaskData); // Pass new task data to parent component
        notification.success({
          message: "Görev Eklendi",
          description: "Yeni görev başarıyla eklendi.",
        });
        onCancel(); // Close modal
        setNewTask({
          isin_adi: "",
          zorunluluk: false,
          is_tanimi: "",
          bas_tarih: "",
          bas_saat: "",
          bitis_tarih: "",
          bitis_saat: "",
          durum: false,
        });
      })
      .catch((error) => {
        console.error("Görev eklenirken hata oluştu:", error);
        notification.error({
          message: "Hata",
          description: "Görev eklenirken bir hata oluştu.",
        });
      });
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          İptal
        </Button>,
        <Button key="add" type="primary" onClick={handleAddTask} className="submit-button">
          Ekle
        </Button>,
      ]}
    >
      <div className="form-container">
        <h2 className="form-title">Yeni Görev Ekle</h2>
        <Form layout="vertical">
          <Form.Item label="İşin Adı">
            <Input
              name="isin_adi"
              value={newTask.isin_adi}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Zorunluluk">
            <Checkbox
              name="zorunluluk"
              checked={newTask.zorunluluk}
              onChange={handleCheckboxChange}
            >
              <span className="checkbox-label">Zorunlu</span>
            </Checkbox>
          </Form.Item>
          <Form.Item label="İş Tanımı">
            <Input
              name="is_tanimi"
              value={newTask.is_tanimi}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Başlangıç Tarihi">
            <Input
              name="bas_tarih"
              type="date"
              value={newTask.bas_tarih}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Başlangıç Saati">
            <Input
              name="bas_saat"
              type="time"
              value={newTask.bas_saat}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Bitiş Tarihi">
            <Input
              name="bitis_tarih"
              type="date"
              value={newTask.bitis_tarih}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Bitiş Saati">
            <Input
              name="bitis_saat"
              type="time"
              value={newTask.bitis_saat}
              onChange={handleNewTaskChange}
            />
          </Form.Item>
          <Form.Item label="Durum">
            <Checkbox
              name="durum"
              checked={newTask.durum}
              onChange={handleCheckboxChange}
            >
              <span className="checkbox-label">Tamamlandı</span>
            </Checkbox>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default AddTaskForm;
