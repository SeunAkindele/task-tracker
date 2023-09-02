import React, {useEffect} from 'react';
import './App.css';
import Modal from './components/Modal';
import { taskTrackerStateAction } from './redux/actions/TaskTrackerAction';
import { connect } from 'react-redux';

const App = ({state, updateState}) => {

  const {modal, updateModal, isVisible, documents, title, description, date, index} = state;

  const openModal = () => {
    updateState({...state, modal: true});
  };

  const closeModal = (modal) => {
    updateState({...state, title: '', description: '', date: '', [modal]: false});
  };

  // Animate scroll to top event
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 200) {
      updateState({...state, isVisible: true});
    } else {
      updateState({...state, isVisible: false});
    }
  };

  // Add a scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to add to list
  const addList = () => {
    const documentsCopy = documents;

    if(title === '' || description === '' || date === '') {
      alert("You have to fill all the fields!!");
      return false;
    }
  
    const titleCopy = title;
    const descriptionCopy = description;
    const dateCopy = date;

    documentsCopy.unshift({
      title: titleCopy,
      description: descriptionCopy,
      date: dateCopy,
      reminder: false,
      completed: false
    });

    updateState({...state, documents: documentsCopy, title: '', description: '', date: '', modal: false});
  }

  // Function to update list
  const updateList = () => {
    let documentsCopy = documents;
  
    for(let x=0; x < documentsCopy.length; x++) {
      if(index === x) {
        documentsCopy.splice(x, 1, {...documentsCopy[index], title, description, date });
      }
    }

    updateState({...state, documents: documentsCopy, title: '', description: '', date: '', updateModal: false, index: null});
  }

  // Function toggle reminder and completed
  const toggle = (index, key) => {
    let documentsCopy = documents;
  
    for(let x=0; x < documentsCopy.length; x++) {
      if(index === x) {
        documentsCopy.splice(x, 1, {...documentsCopy[index], [key]: !documentsCopy[index][key] });
      }
    }

    updateState({...state, documents: documentsCopy, updateModal: false, index: null});
  }

  // Function to delete
  const deleteList = (index) => {
    let documentsCopy = documents;
  
    for(let x=0; x < documentsCopy.length; x++) {
      if(index === x) {
        documentsCopy.splice(x, 1);
      }
    }

    updateState({...state, documents: documentsCopy, index: null});
  }

  // Function to populate the modal text fields
  const populateUpdateModal = (doc, index) => {
    updateState({...state, title: doc.title, description: doc.description, date: doc.date, updateModal: true, index});
  }

  // Function to format date
  const formatDate = (inputDate) => {
    let dateObject = new Date(inputDate);

    let monthNames = [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ];

    // Extract the month, day, and year
    let month = monthNames[dateObject.getMonth()];
    let day = dateObject.getDate();
    let year = dateObject.getFullYear();

    // Format the date as "Month day, Year"
    let formattedDate = month + " " + day + ", " + year;

    return(formattedDate);

  }

  const capitalizeWords = (word) => {
    // Capitalize the first letter of each word
    return word.charAt(0).toUpperCase() + word.slice(1);
  }  

  return (
    <div className="container">
      <header className="header">
        Task Tracker
      </header>
      <div className="add" onClick={openModal}>Add new task <span className="material-icons control">control_point</span></div>
      {
        documents.map((doc, i) => (  
          <div className="list">
            <div className="top">
              <div className="top-left">
                <div className="title">{capitalizeWords(doc.title)}</div>
                <div className="date">
                  <span className="material-icons schedule">event</span>
                  {formatDate(doc.date)} 
                </div>   
              </div>       
              <div className="top-right">    
                <span onClick={() => populateUpdateModal(doc, i)} className="material-icons edit">edit_note</span>
                <span onClick={() => deleteList(i)} className="material-icons delete">clear</span>
              </div>
            </div>
            <div className="description">
              {capitalizeWords(doc.description)}
            </div>
            <div className="bottom">
              <div className="reminder">
                <span className="material-icons alarm">alarm</span>
                Remind me
                {
                  doc.reminder
                  ?
                  <span onClick={() => toggle(i, "reminder")} className="material-icons toggle-on">toggle_on</span>
                  :
                  <span onClick={() => toggle(i, "reminder")} className="material-icons toggle-off">toggle_off</span>
                }
                
              </div>
              
                {
                  doc.completed
                  ?
                  <div className="reminder">
                    Complete
                    <span onClick={() => toggle(i, "completed")} className="material-icons completed">check_circle</span>
                  </div>
                  :
                  <div className="reminder">
                    Incomplete
                    <span onClick={() => toggle(i, "completed")} className="material-icons uncompleted">check_circle</span>
                  </div>
                }                
              
            </div>
          </div>
        ))
      }

      {/* Scroll back to top */}
      {isVisible && <span className="material-icons scroll-up" onClick={scrollToTop}>arrow_circle_up</span>}

      {/* Modal to add to list */}
      <Modal isOpen={modal} closeModal={() => closeModal("modal")}>
        <div className="title">Add New Task</div>
        <input type="text" className="title-text" placeholder="Title" onChange={(text) => updateState({...state, title: text.target.value})} />
        <textarea
          className="description-text"
          rows={8}
          placeholder="Description"
          onChange={(text) => updateState({...state, description: text.target.value})}
        />
        <div className="reminder"><span className="material-icons alarm">alarm</span> Due Date</div>
        <input type="date" className="date-text" onChange={(text) => updateState({...state, date: text.target.value})} />
        <div className="post" onClick={addList}>Add</div>
      </Modal>

      {/* Modal to update list */}
      <Modal isOpen={updateModal} closeModal={() => closeModal("updateModal")}>
        <div className="title">Update this task</div>
        <input type="text" className="title-text" value={title} onChange={(text) => updateState({...state, title: text.target.value})} />
        <textarea
          className="description-text"
          rows={8}
          value={description}
          onChange={(text) => updateState({...state, description: text.target.value})}
        />
        <div className="reminder"><span className="material-icons alarm">alarm</span> Due Date</div>
        <input type="date" className="date-text" value={date} onChange={(text) => updateState({...state, date: text.target.value})} />
        <div className="post" onClick={updateList}>Update</div>
      </Modal>
    </div>
  );
}

const mapStateToProps = ({ taskTracker }) => ({
  state: taskTracker.taskTrackerState,
});

const mapDispatchToProps = (dispatch) => ({
  updateState: (params) => dispatch(taskTrackerStateAction(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);