import React from 'react'
import style from './EditCanvas.module.scss'
import QuestionInput from '../../../components/QuestionComponents/QuestionInput'
import QuestionTitle from '../../../components/QuestionComponents/QuestionTitle'
const EditCanvas: React.FC = () => {
  return (
    <div className={style.canvas}>
      <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionTitle level={2} text={'一级标题'} isCenter></QuestionTitle>
        </div>
      </div>
      <div className={style['component-wrapper']}>
        <div className={style.component}>
          <QuestionInput></QuestionInput>
        </div>
      </div>
    </div>
  )
}
export default EditCanvas
