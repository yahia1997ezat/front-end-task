import React, {useEffect} from 'react'
import {useMst} from "./models/RootStore";
import {observer } from "mobx-react";
import {Button, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
 const  Books = observer(()=> {
    const {BookStore} = useMst()
    return (
        <div>
        {/*list book*/}
        <h2>Books <Link to={"/add-book"} className="btn btn-info ml-3">Add Book</Link> </h2>
        <h2>Books Count: {BookStore.getNumberOfBooks}</h2>
        <h2>Authors Count: {BookStore.getNumberOfAuthors}</h2>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Title <Button variant={"link"} onClick={()=>BookStore.sortBooksBy("title")} >sort</Button></th>
                    <th>Author  <Button variant={"link"} onClick={()=>BookStore.sortBooksBy("author")} >sort</Button></th>
                    <th>Publish Year  <Button variant={"link"} onClick={()=>BookStore.sortBooksBy("publishYear")} >sort</Button></th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {BookStore.books && BookStore.books.map((book)=>{
                    return (
                        <tr>
                            <th>{book.title}</th>
                            <th>{book.author}</th>
                            <th>{book.publishYear}</th>
                            <th>{book.description}</th>
                            <th>
                                <Link to={`/delete-book/`+book.id} className="btn btn-danger">delete</Link>
                                <Link to={`/add-book/`+book.id} className="btn btn-primary">edit</Link>
                            </th>

                        </tr>
                    )
                })}
                </tbody>
            </Table>
        </div>
    );
});
export default Books;