import React from 'react'
import './Item.scss'
import {useNavigate} from 'react-router-dom';
import {useTranslation} from "react-i18next";

function Item({img, title, des, goal, current, id}) {
    const navigate = useNavigate();

    let percentage = parseInt(current/goal * 100)
    
     const { t, i18n } = useTranslation();

    if(percentage ===0){
        percentage = 1;
    }

    if(percentage > 100){
        percentage =100
    }

    const goBlog =()=>{
        navigate(`/project/${id}`);
    }

    return (
        <div className="box__item">
            <img className="imgItem" src={img} unselectable="on" alt=""/>
            <div className="item__info">
                <div className="item__title" onClick={goBlog}>
                    {title[i18n.language]}
                </div>
                <div className="item__des">
                    {des[i18n.language]}
                </div>
            </div>
            <div className="itemGoal_percentage">
                {/* <div className="goal__target">
                    <h3>
                        {t('Donation.item.current')}
                        <b> ${current.toLocaleString()}</b>
                    </h3>
                    <h3>
                        {t('Donation.item.goal')}
                        <b> ${goal.toLocaleString()}</b>
                    </h3>
                </div> */}
                <button onClick={goBlog}>
                    <span>
                        {t('Donation.item.view')}
                    </span>
                </button>
            </div>
        </div>
    )
}

export default Item
