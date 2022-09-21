import { AuthContext } from 'context/AuthContext'
import React, { useState, useContext } from 'react'
import { collection, deleteDoc, doc, getDocs, serverTimestamp, setDoc, where, query } from 'firebase/firestore/lite'
import { firestore } from 'config/firebase'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { useEffect } from 'react';
import { async } from '@firebase/util';


export default function Todos() {

  console.log(window.getRandomId())

  const { user } = useContext(AuthContext)

  const [documents, setDocuments] = useState([])
  const [todo, setTodo] = useState({})
  const [isProcessing, setIsProcessing] = useState(false)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)
  const [isLoading, setIsLoading] = useState(true)



  const handleChange = e => {
    setTodo(s => ({...s, [e.target.name]: e.target.value}))
  }




  const fetchDocuments = async () => {

    let array = []

    const q = query(collection(firestore, "todos"), where("createdBy.uid", "==", user.uid));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      let data = doc.data()
      // doc.data() is never undefined for query doc snapshots
      // console.log(data);

      array.push(data)
      setIsLoading(false)
    });

    setDocuments(array)
  }

  useEffect(() => {
    fetchDocuments()
  }, [user])

  const handleUpdate = async () => {
    console.log(todo)

    let formData = { ...todo }
    formData.dateCreated = formData.dateCreated
    formData.dateModified = serverTimestamp()

    formData.modifiedBy = {
      email: user.email,
      uid: user.uid
    }

    setIsProcessing(true)

    try {
      await setDoc(doc(firestore, "todo", formData.id), formData, { merge: true });
      window.notify("Todo has been successfuly updated", "success")

      let newDocuments = documents.map((doc) => {
        if (doc.id === todo.id)
        return todo
        return doc
      })
      setDocuments(newDocuments)
      //setDocuments(docs =>([...docs, formData]))
    }
    catch (err) {
      console.error(err)
      window.notify("Something went wrong, Todo isn't updated", "error")
    }
    setIsProcessing(false)

  }

  const handleDelet = async (todo) => {
    console.log(todo)

    setIsProcessingDelete(true)

    try {
      await deleteDoc(doc(firestore, "todos", todo.id));
      
      window.notify("Todo has been successfully deleted", "success")

      let newDocuments = documents.filter((doc) => {
        return doc.id !== todo.id
      })
      setDocuments(newDocuments)
    }
      catch (err) {
      console.error(err)
      window.notify("Something went wrong", "error")
    }

    setIsProcessingDelete(false)
  }

  return (
    <>
    <div className='py-5 home d-flex justify-content-center align-items-center'>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2 className="text-center mb-4">My Todo</h2>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="card p-3 p-md-4 p-lg-5">

              {!isLoading
             ? <Table>
                <Thead>
                  <Tr>
                    <Th>Sr. No.</Th>
                    <Th>Title</Th>
                    <Th>Location</Th>
                    <Th>Description</Th>
                    <Th>Status</Th>
                    <Th>Action</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {documents.map((todo, i) => {
                    return <Tr key={i}>
                      <Td>{i + 1}</Td>
                      <Td>{todo.title}</Td>
                      <Td>{todo.location}</Td>
                      <Td>{todo.description}</Td>
                      <Td>{todo.status}</Td>
                      <Td>
                        <button className='btn btn-info btn-sm me-1' data-bs-toggle="modal" data-bs-target="#editModal" onClick={() => { setTodo(todo) }}>
                          {
                            !isProcessing
                            ? "Edit"
                            : <div className="spinner-border spinner-border-sm"></div>
                          }
                        </button>
                        <button className='btn btn-danger btn-sm' disabled={isProcessingDelete} onClick={() => { handleDelet(todo) }}>
                          {
                            !isProcessingDelete
                            ? "Delete"
                              : <div className="spinner-border spinner-border-sm"></div>
                            }
                        </button>
                      </Td>
                    </Tr>
                  })}


                </Tbody>
              </Table>

              : <div className="text-center"><div className="spinner-grow"></div> </div>
            }
            </div>
          </div>
        </div>
      </div>
    </div>

      

<div className="modal fade" id="editModal" >
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Update Todo</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input type="text" className='form-control' name="title" placeholder='Enter Title' value={todo.title} onChange={handleChange} />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input type="text" className='form-control' name="location" placeholder='Enter Location' value={todo.location} onChange={handleChange} />
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                <textarea name="description" className='form-control' rows="5"  placeholder='Enter Description' value={todo.description} onChange={handleChange}></textarea>
              </div>
            </div>
  
            <div className="row">
              <div className="col">
                <select name="status" className='form-control' value={todo.status} onChange={handleChange}>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
       
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={handleUpdate}>Save changes</button>
      </div>
    </div>
  </div>
</div>

            </>
  )
}
