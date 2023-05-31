import React, { useEffect, useState } from 'react';
import List from './list';
import BlogForm from './form';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editBlog, setEditBlog] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((json) => setBlogs(json));
  }, []);

  const onDelete = (id) => {
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
    setBlogs(updatedBlogs);
  };
  const onAdd = () => {
    setIsModalVisible(true);
  };
  const onEdit = (data) => {
    setEditBlog(data);
    setIsModalVisible(true);
  };
  const onSave = (blog) => {
    if (!editBlog) {
      const newBlog = {
        id: Date.now(),
        title: blog.title,
        body: blog.body,
      };
      setBlogs([...blogs, newBlog]);
      // call post api
    } else {
      debugger;
      const updatedBlogs = blogs.map((item) => {
        if (item.id === editBlog.id) {
          return {
            ...item,
            title: blog.title,
            body: blog.body,
          };
        }
        return item;
      });

      setBlogs(updatedBlogs);
    }
    setIsModalVisible(false);
  };
  const onSubmit = (values) => {
    // Handle form submission
    onSave(values);
    onCancel();
  };
  const onCancel = () => {
    setIsModalVisible(false);
    setEditBlog(null);
  };
  return (
    <>
      <List blogs={blogs} onDelete={onDelete} onAdd={onAdd} onEdit={onEdit} />
      <BlogForm
        visible={isModalVisible}
        editData={editBlog}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default Blogs;
