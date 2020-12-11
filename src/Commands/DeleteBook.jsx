import React, {useEffect, useMemo} from "react";
import {Form, Modal, Row} from "react-bootstrap";
import {Col} from "react-bootstrap";
import {Formik} from "formik";
import {useParams, useHistory} from "react-router-dom"
import {useMst} from "../models/RootStore";
import {observer} from "mobx-react"
import AddBook from "./AddBook";

 function DeleteBook() {
     const history = useHistory();
     let onHide=() => {
         history.push("/");
     }
    const {BookStore} = useMst();
    const {id} = useParams();
    const deleteBook = async (values) => {
        console.log(values);
        if (values.id > " ")
            BookStore.removeBook(values.id);
            onHide()
    };
    let itemForEdit = null;
    if (!(id > " ")) {
        return <div>
            <h3>Book not found</h3>
        </div>
    }
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
            initialValues={itemForEdit}
            onSubmit={deleteBook}
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
                            <Col xs={12} md={12}>
                                <h3>
                                    Delete {values.title} Book
                                </h3>
                            </Col>
                            <Col xs={12} md={12}>
                                <p>
                                   Do you want to delete this book?
                                </p>
                            </Col>
                        </Row>
                        <div>
                            <button
                                type="button"
                                onClick={onHide}
                                className="btn btn-light btn-elevate"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="btn btn-danger btn-elevate"
                                disabled={!isValid}
                            >
                                Delete
                            </button>

                        </div>
                    </div>
                </form>
            )}
        </Formik>
    );
}
export default observer(DeleteBook);