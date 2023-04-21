import react from 'react'
import '../css/AdminPortal.css'
import 'bootstrap/dist/css/bootstrap.min.css'

export function AdminPortal() {
    return (
   
    <div class="wrapper-admin-portal">
         
         <a href="/login"><button class="logout">Logout</button></a>
        <p class="fs-1 adminportal-heading">
            <p class="text-center">Current Applicants</p>
            <p class="text-end">
                <p class="fs-6">
                </p>
            </p>
        </p>
        <div class="row g-2">
            <div class="col-md col-md-admin1">
                <div class="form-floating form-floating-custom">
                    <select class="form-select form-admin" id="floatingSelect" aria-label="Filter drop down menu">
                        <option selected>Filter by grant, date, read/unread</option>
                        <option value="grant">grant 1</option>
                        <option value="grant2">grant 2</option>
                        <option value="date">date</option>
                        <option value="read">read</option>
                        <option value="unread">unread</option>
                    </select>
                </div>
            </div>
        
            <div class="col-md col-md-admin2">
                <div class="mb-3 search-bar search-admin">
                    <div class="searchField">
                        <input type="name" class="form-control" id="searchBar" placeholder="Search for applicants"></input> 
                        <button class="search">Search</button>
                    </div>
                </div>
            </div>
            
            
            
        </div>
        <div class="submissions-box">
                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>
                
                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>

                <button class="sub"><a class="submission-link" href="/adminsubappform">Submission</a> 
                </button>
                <label class="switch">
                <input type="checkbox"></input>
                <span class="slider round"></span></label>
            </div>
    </div>
    )
  }