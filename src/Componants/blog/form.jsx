import React from 'react';
import { Button, Modal, Form, Input } from 'antd';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
  title: yup
    .string('Please enter the title')
    .min(10, 'Title should be of minimum 10 characters length.')
    .required('Title is a required field'),
  body: yup
    .string('Please enter the body')
    .min(10, 'Body should be of minimum 10 characters length.')
    .required('Body is a required field'),
});

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

function BlogForm({ visible, editData, onCancel, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      title: editData?.title || '',
      body: editData?.body || '',
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <Modal
      title={editData ? 'Edit Blog' : 'Add Blog'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose>
      <Form layout='vertical' onFinish={formik.handleSubmit}>
        <Form.Item
          label='Title'
          name='title'
          validateStatus={
            formik.touched.title && formik.errors.title ? 'error' : ''
          }
          help={formik.touched.title && formik.errors.title}>
          <Input
            defaultValue={formik.values.title}
            onChange={formik.handleChange}
          />
        </Form.Item>
        <Form.Item
          label='Body'
          name='body'
          validateStatus={
            formik.touched.body && formik.errors.body ? 'error' : ''
          }
          help={formik.touched.body && formik.errors.body}>
          <Input.TextArea
            defaultValue={formik.values.body}
            onChange={formik.handleChange}
            rows={4}
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type='primary' htmlType='submit'>
            {editData ? 'Update' : 'Add'}
          </Button>
          <Button htmlType='button' onClick={onCancel}>
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default BlogForm;
