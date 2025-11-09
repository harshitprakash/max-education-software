import React from 'react';
import Mode from "../../components/Mode";
const login = ()=>{

    return(
       <> 
        <Mode/>
             <div className="tab-content tab__content__wrapper mb-5 mt-5" id="myTabContent" data-aos="fade-up">

                        <div className="tab-pane fade active show" id="projects__one" role="tabpanel" aria-labelledby="projects__one">
                            <div className="col-xl-4  col-sm-6 offset-sm-4">
                                <div className="loginarea__wraper">
                                    <div className="login__heading">
                                        <h5 className="login__title">Login</h5>
                                      
                                    </div>



                                    <form action="#">
                                        <div className="login__form">
                                            <label className="form__label">Username or email</label>
                                            <input className="common__login__input" type="text" placeholder="Your username or email"/>

                                        </div>
                                        <div className="login__form">
                                            <label className="form__label">Password</label>
                                            <input className="common__login__input" type="password" placeholder="Password"/>

                                        </div>
                                        <div className="login__form d-flex justify-content-between flex-wrap gap-2">
                                            <div className="form__check">
                                                <input id="forgot" type="checkbox"/>
                                                <label htmlFor="forgot"> Remember me</label>
                                            </div>
                                            <div className="text-end login__form__link">
                                                <a href="#">Forgot your password?</a>
                                            </div>
                                        </div>
                                        <div className="login__button">
                                            <a className="default__button" href="#">Log In</a>
                                        </div>
                                    </form>



                                </div>
                            </div>
                        </div>



                    </div>
                    </>
    );
};

export default login;