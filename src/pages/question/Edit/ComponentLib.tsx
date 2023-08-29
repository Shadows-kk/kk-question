import React from 'react'
import { Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { nanoid } from 'nanoid'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents/index'
import { addComponent } from '../../../store/componentsReducer'
import style from './ComponentLib.module.scss'
const { Title } = Typography

const generateComponent = (c: ComponentConfType) => {
  const dispatch = useDispatch()
  const { title, type, Component, defaultProps } = c
  const handleClick = () => {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        title,
        type,
        props: defaultProps,
      })
    )
  }
  return (
    <div className={style.container} key={type} onClick={handleClick}>
      <div className={style.component}>
        <Component></Component>
      </div>
    </div>
  )
}
const Lib: React.FC = () => {
  return (
    <>
      {componentConfGroup.map((group, index) => {
        const { groupId, groupName, components } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0' }}>
              {groupName}
            </Title>
            <div>
              {components.map(c => {
                return generateComponent(c)
              })}
            </div>
          </div>
        )
      })}
    </>
  )
}
export default Lib
