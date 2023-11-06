"use client"

import "@/../public/css/style.scss"
import "bootstrap/dist/css/bootstrap.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import { useContext, useEffect, useState, createContext } from "react"

const Steps = createContext();


function Step1() {

  const form = useContext(Steps);


  return(

    <div className="step1 Step">
      <h1> Personal info </h1>
      <p> Please provide your name, email address, and phone number. </p>

      <form id="info">
        <label form="info" htmlFor="name">Name <span className="float-end errText">{form.form.name.err}</span> </label>
        <br />
        <input className={form.form.name.class} type="text" id="name" placeholder="e.g. Stephen King" value={form.form.name.value} onChange={e => form.setForm({...form.form, name: { value: e.target.value, err: "", class: "" }}) }/>
        <br />
        <label form="info" htmlFor="mail">Emaill Address <span className="float-end errText">{form.form.mail.err}</span> </label>
        <br />
        <input className={form.form.mail.class} type="email" id="mail" placeholder="e.g. stephenking@lorem.com" value={form.form.mail.value} onChange={e => form.setForm({...form.form, mail: { value: e.target.value, err: "", class: "" }}) }/>
        <br />
        <label form="info" htmlFor="num" >Phone Number <span className="float-end errText">{form.form.phone.err}</span> </label>
        <br />
        <input className={form.form.phone.class} type="tel"  id="num" placeholder="e.g. +1 234567890" value={form.form.phone.value} onChange={e => form.setForm({...form.form, phone: { value: e.target.value, err: "", class: "" }}) }/>
      </form>

    </div>
  )

}

function Step2() {

  const form = useContext(Steps);

  const setPaid = () => {
    form.plan.m_y == "m" ? form.setPlan({...form.plan, m_y : "y"}) : form.setPlan({...form.plan, m_y : "m"});
  }

  const selectPlan = (index) => {

    const newArr = [...form.plan.plans].map((obj, i) => {

      if (i == index) {
        return {...obj, selected : true};
      } else {
        return {...obj, selected : false};
      }

    })

    form.setPlan({...form.plan, plans : newArr});

  }

  return(
    <div className="step2 Step">
      <h1> Select your plan </h1>
      <p> You have the option of monthly or yearly billing. </p>

      <div className="row plans">

        {
          form.plan.plans.map(({id, plan, mPrice, yPrice, freeMonths, selected}, i) => {

            return(
              <div key={id} className={`col col-md-4 col-12 row`}>
                <div className={`col col-12 row plan ${ selected ? "selected" : "" }`} onClick={() => selectPlan(i)}>

                  <div className="col col-md-12 col-sm-2 col-4 pic">
                    <img src={`./images/icon-${plan}.svg`} />
                  </div>
                  <div className="col col-md-12 col-sm-10 col-8 text">
                    <h6>{plan.replace(plan[0], plan[0].toUpperCase())}</h6>
                    <p>
                      {
                        form.plan.m_y == "m" ?
                        <span>${mPrice}/mo</span>
                        :
                        <>
                          <span>${yPrice}/yr</span>
                          <br/>
                          {freeMonths && <span className="colored"> {freeMonths} months free</span>}
                        </>
                      }
                    </p>
                  </div>

                </div>
              </div>
            )
          })
        }

      </div>

      <div className="m_y">
        <span className={form.plan.m_y == "m" ? "colored" : "" }>Monthly</span> <span className="slide"> <span className={form.plan.m_y == "m" ? "left" : "right"} onClick={ setPaid }></span> </span> <span className={form.plan.m_y == "y" ? "colored" : ""}>Yearly</span>
      </div>

    </div>
  )

}
function Step3() {

  const form = useContext(Steps);

  const select = (index) => {

    const newArr = [...form.ons].map((obj, i) => {

      if (i == index) {
        return {...obj, checked : !obj.checked};
      }

      return obj;

    })

    form.setOns(newArr)

  }

  return(
    <div className="step3 Step">

      <h1> Pick add-ons </h1>
      <p> Add-ons help enhance your gaming experience. </p>

      <div className="row ons">

        {

          form.ons.map(({id, service, des, mPrice, yPrice, checked}, i) => {

            return(

              <div key={ id } className="col col-12">
                <div className={`row on ${ checked ? "selected" : "" }`} onClick={() => {select(i)}} >
                  <div className="col col-1">
                    <span className={ `box ${checked ? "checked" : ""}` }>{ checked && <img src="./images/icon-checkmark.svg" /> }</span>
                  </div>
                  <div className="col col-9">
                    <span className="colored"> { service } </span>
                    <span> { des } </span>
                  </div>
                  <div className="col col-2 pr">
                    <span className="price">
                      {
                        form.plan.m_y == "m" ? `+$${mPrice}/mo` : `+$${yPrice}/yr`
                      }
                    </span>
                  </div>
                </div>
              </div>

            )

          })

        }

      </div>

    </div>
  )

}
function Step4() {

  const form = useContext(Steps);

  const summary = {
    plan: {
      plan: form.plan.plans.filter(plan => plan.selected == true)[0].plan,
      price: form.plan.m_y == "m" ?
      form.plan.plans.filter(plan => plan.selected == true)[0].mPrice :
      form.plan.plans.filter(plan => plan.selected == true)[0].yPrice,
    },
    sys: form.plan.m_y,
    ons: form.ons.filter(on => on.checked == true).map((on) => {
      return {
        id : on.id,
        on: on.service,
        price: form.plan.m_y == "m" ?
        on.mPrice :
        on.yPrice
      }
    })
  }

  let num = 0

  const sumOns = summary.ons.forEach(e => {
    num = e.price + num;
  });

  const sumPrice = summary.plan.price + num;


  return(
    <div className="Step step4">

      <h1> Finishing up </h1>
      <p> Double-check everything looks OK before confirming. </p>

      <div className="row">
        <div className="col col-12 row data">
          <div className="col col-12 row plan">
            <div className="col col-9 text">
              <span className="colored">{summary.plan.plan.replace(summary.plan.plan[0], summary.plan.plan[0].toUpperCase())} { summary.sys == "m" ? "(Monthly)" : "(Yearly)"} </span>
              <br />
              <span className="change" onClick={() => {form.setStep(2)}}> Change </span>
            </div>
            <div className="col col-3 price">
              <span className="float-end colored">${summary.plan.price}/{summary.sys == "m" ? "mo" : "yr"}</span>
            </div>
          </div>
          {
            summary.ons.length > 0 && <div className="hr"></div>
          }
            {
              summary.ons.map(({id, on, price}) => (
                <div key={id} className="col col-12 row on">
                  <div className="col col-9 text">
                    <span>{on}</span>
                  </div>
                  <div className="col col-3 price">
                    <span className="float-end colored">+${price}/{summary.sys == "m" ? "mo" : "yr"}</span>
                  </div>
                </div>
              ))
            }
        </div>
        <div className="col col-12 row total">
          <div className="col col-12 row">
            <div className="col col-9 text">
              <span>Total (Per { summary.sys == "m" ? "month" : "year"}) </span>
            </div>
            <div className="col col-3 price">
              <span className="float-end colored">${sumPrice}/{summary.sys == "m" ? "mo" : "yr"}</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  )

}

function Thanks() {

  return(
    <div className="Step thanks">
      <div>
        <img src="./images/icon-thank-you.svg" />
      </div>
      <h1> Thank you! </h1>
      <p> Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com.  </p>
    </div>
  )

}

export default function Home() {

  const [step, setStep] = useState(1);
  const [form, setForm] = useState(
    {
      name : {value: "", err: "", class: ""},
      mail : {value: "", err: "", class: ""},
      phone: {value: "", err: "", class: ""}
    }
  );
  const [plan, setPlan] = useState(
    {
      plans: [
        {id: 1, plan: "arcade", mPrice: 9, yPrice: 90, freeMonths: 2, selected: true},
        {id: 2, plan: "advanced", mPrice: 12, yPrice: 120, freeMonths: 2, selected: false},
        {id: 3, plan: "pro", mPrice: 15, yPrice: 150, freeMonths: 2, selected: false}
      ],
      m_y : "m"
    }
  );
  const [ons, setOns] = useState(
    [
      {id: 1, service : "Online services", des: "Access to multiplayer games", mPrice: 1, yPrice: 10, checked: false},
      {id: 2, service : "Larger storage", des: "Extra 1TB of cloud save", mPrice: 2, yPrice: 20, checked: false},
      {id: 3, service : "Customizable profile", des: "Custom theme on your profile", mPrice: 2, yPrice: 20, checked: false}
    ]
  );

  const checkName = () => {

    const regex = /^[a-zA-z\s]+$/;

    if (form.name.value.length == 0) {
      setForm({...form, name : {...form.name, err: "This field is required", class: "err"}});
      return false;
    }

    if (!regex.test(form.name.value)) {
      setForm({...form, name : {...form.name, err: "Please input letters only", class: "err"}});
      return false;
    }

    setForm({...form, name : {...form.name, err: "", class: ""}});
    return true;

  }

  const checkMail = () => {

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (form.mail.value.length == 0) {

      setForm({...form, mail : {...form.mail, err: "This field is required", class: "err"}});
      return false;

    }

    if (!regex.test(form.mail.value)) {

      setForm({...form, mail : {...form.mail, err: "Your mail is invalid", class: "err"}});
      return false;

    }

    setForm({...form, mail : {...form.mail, err: "", class: ""}});
    return true;

  }

  const checkPhone = () => {

    const numRegex = /^[+0-9\s]{1,}$/;
    const phoneRegex = /^\+[0-9]{5,}$/;

    if (form.phone.value.length == 0) {

      setForm({...form, phone : {...form.phone, err: "This field is required", class: "err"}});
      return false;

    }

    if (!numRegex.test(form.phone.value)) {

      setForm({...form, phone : {...form.phone, err: "Your phone number is invalid", class: "err"}});
      return false;

    }

    if (!phoneRegex.test(form.phone.value)) {

      setForm({...form, phone : {...form.phone, err: "Please follow this pattern +xxxxxxx", class: "err"}});
      return false;

    }

    setForm({...form, phone : {...form.phone, err: "", class: ""}});
    return true;

  }

  const next = () => {
    if (checkName() && checkMail() && checkPhone()) {
      step < 5 ? setStep(step + 1) : setStep(step);
    }
  }

  const prev = () => {
    step > 1 ? setStep(step - 1) : setStep(step);
  }

  return (

    <>
    {/* desktop */}
      <div className="container-fluid con d-none d-md-block">
        <div className="row card">
          <div className="col col-md-4 side">
            <img src="./images/bg-sidebar-desktop.svg" />
            <div className="steps row">
              <div className="col col-md-12 row step">
                <div className="col-md-4 num">
                  <span className={step == 1 ? "selected" : ""}>1</span>
                </div>
                <div className="col-md-8 text">
                  <span className="light">STEP 1</span>
                  <span className="bold">YOUR INFO</span>
                </div>
              </div>
              <div className="col col-md-12 row step">
                <div className="col col-md-4 num">
                  <span className={step == 2 ? "selected" : ""}>2</span>
                </div>
                <div className="col col-md-8 text">
                  <span className="light">STEP 2</span>
                  <span className="bold">SELECT PLAN</span>
                </div>
              </div>
              <div className="col col-md-12 row step">
                <div className="col col-md-4 num">
                  <span className={step == 3 ? "selected" : ""}>3</span>
                </div>
                <div className="col col-md-8 text">
                  <span className="light">STEP 3</span>
                  <span className="bold">ADD-ONS</span>
                </div>
              </div>
              <div className="col col-md-12 row step">
                <div className="col col-md-4 num">
                  <span className={step == 4 || step == 5 ? "selected" : ""}>4</span>
                </div>
                <div className="col col-md-8 text">
                  <span className="light">STEP 4</span>
                  <span className="bold">SUMMARY</span>
                </div>
              </div>
            </div>
          </div>
          <div className="col col-md-8 content row">
            <div className="col col-md-12 steps">
              {
                <Steps.Provider value={{step, setStep, form, setForm, plan, setPlan, ons, setOns}}>
                  {step == 1 && <Step1></Step1> }
                  {step == 2 && <Step2></Step2> }
                  {step == 3 && <Step3></Step3> }
                  {step == 4 && <Step4></Step4> }
                  {step == 5 && <Thanks></Thanks> }
                </Steps.Provider>
              }
            </div>
            {
              step !== 5 &&
              <div className="col col-md-12 options">
                { step != 1 && <span className="prev float-start" onClick={prev}> Go Back </span>}
                <span className={`${step != 4 ? "next" : "confirm"} float-end`} onClick={next}> {step != 4 ? "Next Step" : "Confirm"} </span>
              </div>
            }
          </div>
        </div>
      </div>

      {/* mobile */}

      <div className="container-fluid mob-con d-md-none d-block">
        <div className="row con-mob">
          <div className="col col-12 side">
            <img src="./images/bg-sidebar-mobile.svg" />
            <div className="steps row">
              <div className="col col-2"></div>
              <div className="col col-2 step">
                <span className={step == 1 ? "selected" : ""}>1</span>
              </div>
              <div className="col col-2 step">
                <span className={step == 2 ? "selected" : ""}>2</span>
              </div>
              <div className="col col-2 step">
                <span className={step == 3 ? "selected" : ""}>3</span>
              </div>
              <div className="col col-2 step">
                <span className={step == 4 || step == 5 ? "selected" : ""}>4</span>
              </div>
              <div className="col col-2"></div>
            </div>
          </div>
          <div className="col col-12 row card">
            <div className="col col-12 content row">
              <div className="col col-12 steps">
                {
                  <Steps.Provider value={{step, setStep, form, setForm, plan, setPlan, ons, setOns}}>
                    {step == 1 && <Step1></Step1> }
                    {step == 2 && <Step2></Step2> }
                    {step == 3 && <Step3></Step3> }
                    {step == 4 && <Step4></Step4> }
                    {step == 5 && <Thanks></Thanks> }
                  </Steps.Provider>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="row op">
        {
          step !== 5 &&
          <div className="col col-12 options">
            { step != 1 && <span className="prev float-start" onClick={prev}> Go Back </span>}
            <span className={`${step != 4 ? "next" : "confirm"} float-end`} onClick={next}> {step != 4 ? "Next Step" : "Confirm"} </span>
          </div>
        }
        </div>
      </div>
    </>
  )
}
