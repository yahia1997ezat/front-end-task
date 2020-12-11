import React, {useEffect, useMemo} from "react";
import {Form, Modal, Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import * as Yup from "yup";
import {Formik} from "formik";
import {useHistory, useParams} from "react-router-dom"
import {useMst} from "../models/RootStore";
import {observer} from "mobx-react"

const EditSchema = Yup.object().shape({
    title: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required(),
    author: Yup.string()
        .min(3, "Minimum 3 symbols")
        .max(50, "Maximum 50 symbols")
        .required(),
    publishYear: Yup.string()
        .required(),


});

export function AddBook() {
    const history = useHistory();
    let onHide=() => {
        history.push("/");
    }
    const {BookStore} = useMst();
    const {id} = useParams();
    const addOrUpdateBook = async (values) => {
        console.log(values);
        if (values.id > " ")
            BookStore.editBook(values.id,values);
        else
            BookStore.addBook(values);
        onHide()

    };
    let itemForEdit = null;
    if (id > " ") {
        itemForEdit = BookStore.books.find((book) => book.id === id);
    }
    if (!itemForEdit && id > " ")
        return <div>
            <h3>Book not found</h3>
        </div>


    return (

                <Formik
                    enableReinitialize={true}
                    initialValues={itemForEdit ||
                    {
                        title: "",
                        author: "",
                        publishYear: "",
                        description: "",
                    }
                    }
                    validationSchema={EditSchema}
                    onSubmit={addOrUpdateBook}
                >
                    {({
                          handleSubmit,
                          values,
                          touched,
                          handleBlur,
                          handleChange,
                          errors,
                          isValid,
                      }) => (
                        <form onSubmit={handleSubmit}>


                            {console.log(touched, errors)}
                            <div className="bg-white p-4">
                                <Row>
                                    <Col xs={6} md={5}>
                                        <Form.Group controlId="title">
                                            <Form.Label> Title</Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                value={values.title}
                                                onBlur={handleBlur}
                                                type="text"
                                                isInvalid={touched.title && !!errors.title}
                                                placeholder="Enter Book Title"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.title}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <Form.Group controlId="author">
                                            <Form.Label> Author</Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                value={values.author}
                                                onBlur={handleBlur}
                                                type="text"
                                                isInvalid={touched.author && !!errors.author}
                                                placeholder="Enter Book Title"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.author}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <Form.Group controlId="description">
                                            <Form.Label> Description</Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                value={values.description}
                                                onBlur={handleBlur}
                                                type="text"
                                                isInvalid={touched.description && !!errors.description}
                                                placeholder="Enter Book Title"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.description}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={6} md={5}>
                                        <Form.Group controlId="publishYear">
                                            <Form.Label> Publish year</Form.Label>
                                            <Form.Control
                                                onChange={handleChange}
                                                value={values.publishYear}
                                                onBlur={handleBlur}
                                                type="text"
                                                isInvalid={touched.publishYear && !!errors.publishYear}
                                                placeholder="Enter Publish Year"
                                            />
                                            <Form.Control.Feedback type="invalid">
                                                {errors.publishYear}
                                            </Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-elevate"
                                disabled={!isValid}
                            >
                                Save
                            </button>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
                            </button>
                        </form>
                    )}
                </Formik>


    );
}

export default observer(AddBook);