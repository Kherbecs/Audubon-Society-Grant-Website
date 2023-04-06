import react from 'react'
import '../css/AdminPortal.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function AdminPortal() {
    return (
   
    <div class="wrapper-admin-portal">
         
         <a href="/login"><button class="logout">Logout</button></a>
        <p class="fs-1">
            <p class="text-center">Current Applicants</p>
            <p class="text-end">
                <p class="fs-6">
                </p>
            </p>
        </p>
        <div class="row g-2">
            <div class="col-md">
                <div class="form-floating form-floating-custom">
                    <select class="form-select" id="floatingSelect" aria-label="Filter drop down menu">
                        <option selected>Filter by grant, date, read/unread</option>
                        <option value="grant">grant 1</option>
                        <option value="grant2">grant 2</option>
                        <option value="date">date</option>
                        <option value="read">read</option>
                        <option value="unread">unread</option>
                    </select>
                </div>
            </div>
        
            <div class="col-md">
                <div class="mb-3 search-bar">
                    <div class="searchField">
                        <input type="name" class="form-control" id="searchBar" placeholder="Search for applicants"></input> 
                        <button class="search">Search</button>
                    </div>
                </div>
            </div>
            
            
            
        </div>
        <div class="submissions-box">
                <button class="sub1"><a class="submission-link" href="/adminsubappform">Submission</a></button>
                <button class="sub2"><a class="submission-link" href="/adminsubappform">Submission</a></button>
                <button class="sub3"><a class="submission-link" href="/adminsubappform">Submission</a></button>
            </div>
    </div>
    )
  }