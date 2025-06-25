import { useEffect, useState } from "react";
import "./main.css";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Card,
  Tag,
  Row,
  Col,
  message,
  Modal,
} from "antd";
import {
  SearchOutlined,
  TagOutlined,
  StarOutlined,
  GlobalOutlined,
  EditOutlined,
  FileTextOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import API from "../utils/api"; 

export default function Main() {
  const [bookmarks, setBookmarks] = useState([]);
  const [form] = Form.useForm();
  const [editForm] = Form.useForm();
  const [filter, setFilter] = useState({ showFavs: false, tag: "", title: "" });
  const [editingBookmark, setEditingBookmark] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);

  const fetchBookmarks = async () => {
    try {
      const res = await API.get("/books");
      setBookmarks(res.data);
    } catch {
      message.error("Failed to fetch bookmarks");
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleAdd = async (values) => {
    const payload = {
      name: values.title,
      url: values.url,
      notes: values.notes,
      tags: values.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await API.post("/books", payload);
      form.resetFields();
      fetchBookmarks();
      message.success("Bookmark added!");
    } catch {
      message.error("Failed to add bookmark");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/books/${id}`);
      fetchBookmarks();
      message.success("Deleted");
    } catch {
      message.error("Delete failed");
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await API.patch(`/books/${id}/favorite`);
      fetchBookmarks();
    } catch {
      message.error("Error updating favorite");
    }
  };

  const openEditModal = (bookmark) => {
    setEditingBookmark(bookmark);
    editForm.setFieldsValue({
      title: bookmark.name,
      url: bookmark.url,
      notes: bookmark.notes,
      tags: bookmark.tags.join(", "),
    });
    setEditModalVisible(true);
  };

  const handleEditSubmit = async (values) => {
    const payload = {
      name: values.title,
      url: values.url,
      notes: values.notes,
      tags: values.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      await API.put(`/books/${editingBookmark._id}`, payload);
      setEditModalVisible(false);
      fetchBookmarks();
      message.success("Bookmark updated!");
    } catch {
      message.error("Update failed");
    }
  };

  const filtered = bookmarks.filter((b) => {
    return (
      (!filter.showFavs || b.favorite) &&
      (filter.tag === "" || b.tags.includes(filter.tag)) &&
      b.name.toLowerCase().includes(filter.title.toLowerCase())
    );
  });

  const inputStyle = { border: "1px solid #333" };

  return (
    <div style={{ padding: "16px" }}>
      {/* Filters */}
      <div style={{ marginBottom: "32px", background: "#fafafa", padding: 16, borderRadius: 8 }}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={8}>
            <label style={{ fontWeight: "bold" }}>Search by title</label>
            <Input
              placeholder="Enter title"
              prefix={<SearchOutlined />}
              value={filter.title}
              onChange={(e) => setFilter({ ...filter, title: e.target.value })}
              style={inputStyle}
            />
          </Col>
          <Col xs={24} sm={8}>
            <label style={{ fontWeight: "bold" }}>Filter by tag</label>
            <Input
              placeholder="Enter tag"
              prefix={<TagOutlined />}
              value={filter.tag}
              onChange={(e) => setFilter({ ...filter, tag: e.target.value })}
              style={inputStyle}
            />
          </Col>
          <Col xs={24} sm={8} style={{ display: "flex", alignItems: "end" }}>
            <Checkbox
              checked={filter.showFavs}
              onChange={() =>
                setFilter({ ...filter, showFavs: !filter.showFavs })
              }
            >
              <StarOutlined style={{ marginRight: 8 }} />
              Favourites only
            </Checkbox>
          </Col>
        </Row>
      </div>

      {/* Add Bookmark Form */}
      <Form layout="vertical" form={form} onFinish={handleAdd}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <Input placeholder="Bookmark title" prefix={<EditOutlined />} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="url" label="URL" rules={[{ required: true }]}>
              <Input placeholder="https://example.com" prefix={<GlobalOutlined />} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Form.Item name="notes" label="Notes">
              <Input placeholder="Optional notes" prefix={<FileTextOutlined />} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Form.Item name="tags" label="Tags">
              <Input placeholder="tag1, tag2" prefix={<TagOutlined />} style={inputStyle} />
            </Form.Item>
          </Col>
          <Col xs={24} md={2}>
            <Form.Item label=" ">
              <Button type="primary" htmlType="submit" block icon={<PlusCircleOutlined />}>
                Add
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      {/* Bookmark List */}
      <Row gutter={[16, 16]} style={{ marginTop: 32 }}>
        {filtered.map((b) => (
          <Col xs={24} sm={12} md={8} key={b._id}>
            <Card
              style={{ border: "1px solid #1f1f1f", borderRadius: 8 }}
              title={
                <a href={b.url} target="_blank" rel="noopener noreferrer">
                  {b.name}
                </a>
              }
              actions={[
                <Button size="small" onClick={() => toggleFavorite(b._id)} type="link">
                  {b.favorite ? "★ Unmark" : "☆ Favourite"}
                </Button>,
                <Button size="small" onClick={() => openEditModal(b)}>Edit</Button>,
                <Button size="small" danger onClick={() => handleDelete(b._id)}>Delete</Button>,
              ]}
            >
              {b.notes && <p>{b.notes}</p>}
              <div style={{ marginBottom: 8 }}>
                {b.tags.map((tag, i) => (
                  <Tag key={i}>{tag}</Tag>
                ))}
              </div>
            </Card>
          </Col>
        ))}
        {filtered.length === 0 && (
          <Col span={24}>
            <p>No bookmarks found.</p>
          </Col>
        )}
      </Row>

      {/* Edit Modal */}
      <Modal
        title="Edit Bookmark"
        open={isEditModalVisible}
        onCancel={() => setEditModalVisible(false)}
        footer={null}
      >
        <Form form={editForm} layout="vertical" onFinish={handleEditSubmit}>
          <Form.Item name="title" label="Title" rules={[{ required: true }]}>
            <Input prefix={<EditOutlined />} style={inputStyle} />
          </Form.Item>
          <Form.Item name="url" label="URL" rules={[{ required: true }]}>
            <Input prefix={<GlobalOutlined />} style={inputStyle} />
          </Form.Item>
          <Form.Item name="notes" label="Notes">
            <Input prefix={<FileTextOutlined />} style={inputStyle} />
          </Form.Item>
          <Form.Item name="tags" label="Tags">
            <Input prefix={<TagOutlined />} placeholder="tag1, tag2" style={inputStyle} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
