import React from "react-dom/client";
import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";
import { WriteApplication } from "../util/writeApplication";
import { useSponsorRedirect } from "../hooks/useSponsorRedirect";

var GET_DATA = gql`query{
  customerStatuses{
    id
    name
  }
  countries
  {
    iso2
    name
    customData
  }
  languages
  {
    iso2
    name
  }
  sourceGroups
  {
    id
    acceptedValues
    {
      value
      description
    }
  }
}`;

const Enrollment = () => {
  const [activeItem, setActiveItem] = useState({});
  const { loading: sloading, error: serror, data: sponsor } = useSponsorRedirect();
  const { loading, error, data } = useQuery(GET_DATA, {});

  if (sloading) return `Loading...`;
  if (serror) return `! ${serror}`;

  if (loading) return `Loading...`;
  if (error) return `Error! ${error}`;

  const customerTypes = data.sourceGroups.find(elem => elem.id == 'CustType')?.acceptedValues;

  const handleChange = (e) => {
    setActiveItem(values => ({ ...values, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async e => {
    e.preventDefault();

    WriteApplication(activeItem, sponsor, (success) => {
      alert(success);
    }, (error) => {
      alert('Err:' + error);
    });
  }

  return <>
    <div className="container-xl">
      <div className="page-header d-print-none">
        <div class="container-xl">
          <div class="row g-2 align-items-center">
            <div class="col">
              <h2 class="page-title">
                Standard Enrollment Application
              </h2>
              {JSON.stringify(sponsor)}
            </div>
          </div>
        </div>
      </div>
      <div className="page-body">
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          <div className="">
            <div className="row row-cards">
              <div className="col-md-12">
                <div className="card" >
                  <div className="card-header">
                    <h3 className="card-title">Enrolment Type</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label required">Customer Type</label>
                          <select className="form-select" name="customerType" value={activeItem?.customerType ?? ''} onChange={handleChange}>
                            <option value="" disabled>Select Option</option>
                            {customerTypes && customerTypes.map((ctype) => {
                              return <option key={ctype.value} value={ctype.value}>{ctype.description}</option>
                            })}
                          </select>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label required">Customer Status</label>
                          <select className="form-select" name="status" value={activeItem?.status ?? ''} onChange={handleChange}>
                            <option value="" disabled>Select Option</option>
                            {data.customerStatuses && data.customerStatuses.map((ctype) => {
                              return <option key={ctype.id} value={ctype.id}>{ctype.name}</option>
                            })}
                          </select>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Sponsor</label>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-8">
                <div className="card" >
                  <div className="card-header">
                    <h3 className="card-title">Profile</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label required">First Name</label>
                          <input className="form-control" name="firstName" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label required">Last Name</label>
                          <input className="form-control" name="lastName" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label">Company Name</label>
                          <input className="form-control" name="companyName" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Birthdate</label>
                          <input type="date" className="form-control" autoComplete="off" name="birthDate" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Profile Image Url</label>
                          <input className="form-control" name="profileImage" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="mb-3">
                          <label className="form-label">Web Alias</label>
                          <input className="form-control" name="webAlias" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-4">
                <div className="card" >
                  <div className="card-header">
                    <h3 className="card-title">Contact Info</h3>
                  </div>
                  <div className="card-body">
                    <div className="mb-3">
                      <label className="form-label required">Primary Phone</label>
                      <input className="form-control" name="primaryPhone" value={activeItem.primaryPhone} onChange={handleChange} />
                      <span className="text-danger"></span>
                    </div>
                    <div className="mb-3">
                      <label className="form-label required">Secondary Phone</label>
                      <input className="form-control" name="secondaryPhone" value={activeItem.secondaryPhone} onChange={handleChange} />
                      <span className="text-danger"></span>
                    </div>
                    <div className="mb-3">
                      <label className="form-label required">Email Address</label>
                      <input className="form-control" name="emailAddress" value={activeItem.emailAddress} onChange={handleChange} />
                      <span className="text-danger"></span>
                    </div>
                    <div className="mb-3">
                      <label className="form-label required">Language</label>
                      <select className="form-select" name="language" value={activeItem.language} onChange={handleChange} >
                        <option value="" disabled>Select Option</option>
                        {data.languages && data.languages.map((language) => {
                          return <option key={language.iso2} value={language.iso2}>{language.name}</option>
                        })}
                      </select>
                      <span className="text-danger"></span>
                    </div>
                  </div>

                </div>
              </div>

              <div className="col-md-6">
                <div className="card" >
                  <div className="card-header">
                    <h3 className="card-title">Customer Address</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label required">Address</label>
                          <input className="form-control" name="billing_line1" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label required">City</label>
                          <input className="form-control" name="billing_city" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label required">State</label>
                          <input className="form-control" name="billing_state" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label required">Zip Code</label>
                          <input className="form-control" name="billing_zip" onChange={handleChange} />
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label required">Country</label>
                          <select className="form-select" name="billing_country" onChange={handleChange} >
                            {data.countries && data.countries.map((country) => {
                              return country.customData ? <option key={country.iso2} value={country.iso2}>{country.name}</option> : <></>
                            })}
                          </select>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-6">
                <div className="card" >
                  <div className="card-header">
                    <h3 className="card-title">Shipping Address</h3>
                  </div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label required">Address</label>
                          <input className="form-control" name="shipping_line1" onChange={handleChange}/>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mb-3">
                          <label className="form-label required">City</label>
                          <input className="form-control" name="shipping_city" onChange={handleChange}/>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-4">
                        <div className="mb-3">
                          <label className="form-label required">State</label>
                          <input className="form-control" name="shipping_state" onChange={handleChange}/>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mb-3">
                          <label className="form-label required">Zip Code</label>
                          <input className="form-control" name="shipping_zip" onChange={handleChange}/>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="mb-3">
                          <label className="form-label required">Country</label>
                          <select className="form-select" name="shipping_country" onChange={handleChange} >
                            {data.countries && data.countries.map((country) => {
                              return country.customData ? <option key={country.iso2} value={country.iso2}>{country.name}</option> : <></>
                            })}
                          </select>
                          <span className="text-danger"></span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className="card">

            <div className="card-footer">
              <button type="submit" className="btn btn-primary">Submit Application</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </>
}

export default Enrollment;