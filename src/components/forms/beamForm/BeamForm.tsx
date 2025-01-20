'use client'

import { beamTypes, steelGrades } from '@/lib/data'
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from '@/lib/utils'
import React, { ReactNode, useEffect, useState } from 'react'
import { CiLock } from 'react-icons/ci'
import { FaUndo } from 'react-icons/fa'
import { FaRegCopy, FaTrashCan } from 'react-icons/fa6'
// styles import
import styles from "./beamForm.module.css"
import ValidationErrorMessage from '@/components/validationErrorMessage/ValidationErrorMessage'
import Tooltip from '@/components/tooltip/Tooltip'

type BeamFormData = {
  name: string;
  type: string;
  size: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const BeamForm = ({materialGradesArr} : {materialGradesArr: ReactNode[]}) => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const beamTypesArr = beamTypes.map((beamType) => {
    return (
      <option key={beamType.type} value={beamType.type}>{beamType.type}</option>
    )
  })

  const initialFormData = {
    name: "Dwuteownik",
    type: "",
    size: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<BeamFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<BeamFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [indexName, setIndexName] = useState("");
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [isOwnGradeOn, setIsOwnGradeOn] = useState(false);

  useEffect(() => {
    const newIndexName = `${formData.name.toUpperCase()} ${formData.type} ${convertDotToComa(removeZeroCharFromNum(formData.size))} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData]);

  useEffect(() => {
    if (isShowTooltip) {
      setTimeout(() => {
        setIsShowTooltip(false);
      }, 1900);
    } 
  }, [isShowTooltip]);

  const toggleIsOwnGradeOn = () => {
    setIsOwnGradeOn(prevState => !prevState)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    navigator.clipboard.writeText("")
    setFormErrorMessage("")
    setIsUndoOn(false);
    const {name, value, type} = e.target
    if ("checked" in e.target) {
      const checked = e.target.checked
      setFormData(prevFormData => {
        return {
          ...prevFormData,
          [name]: type === "checkbox" ? checked: value
        }
      })
    }
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }
 
  const clearForm = () => {
    setFormData(initialFormData);
    setSavedFormData(formData)
    setIsUndoOn(true);
  }

  const undo = () => {
    setIsUndoOn(false);
    setFormData(savedFormData);
  }

  const checkForm = () => {
    setFormErrorMessage("")
    if (
      formData.type === ""
    ) {
      setFormErrorMessage(`Wybierz typ profilu`)
      return
    }
    if (
      parseFloat(formData.size.toString()) === 0 ||
      !formData.size 
    ) {
      setFormErrorMessage(`Wymiar A nie może być pusty lub równy 0`)
      return
    }
    if (
      parseFloat(formData.size.toString()) < 0
    ) {
      setFormErrorMessage(`Wymiar A nie może być ujemny`)
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
    setIsShowTooltip(true);
    copyToClipboard(indexName);
  }

  const copyToClipboard = (indexName: string) => {
    navigator.clipboard.writeText(indexName)
  }


  return (
    <div className={styles.formContainer}>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
          <input
            type='text'
            name='name'
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor="type">Typ</label>
          <select
            name='type'
            onChange={handleChange}
            value={formData.type}
          >
            <option value={""}>---</option>
            {beamTypesArr}
          </select>
        </div>
        <div className={styles.formElement}>
          <label htmlFor='size'>Wymiar</label>
          <input
            type='number'
            name='size'
            onChange={handleChange}
            value={formData.size}
            min={0}
          />
        </ div>

        {!isOwnGradeOn && 
        <div className={styles.formElement}>
          <label htmlFor="gradeEU">
            Gatunek
            <button 
              onClick={toggleIsOwnGradeOn} 
              type="button"
              className="small__btn"
            >
            Edytuj
            </button>
          </label>
          <select
            name='gradeEU'
            onChange={handleChange}
            value={formData.gradeEU}
          >
            <option value={""}>---</option>
            {materialGradesArr ? materialGradesArr : gradeOptionsArr}
          </select>
        </div>}

        {isOwnGradeOn && 
        <div className={styles.formElement}>
          <label htmlFor="gradeEU">
            Gatunek
            <button 
              onClick={toggleIsOwnGradeOn} 
              type="button"
              className="small__btn"
            >
            Lista
            </button>
          </label>
          <input
            type="text"
            name='gradeEU'
            onChange={handleChange}
            value={formData.gradeEU}
          />
        </div>}

        <div className={styles.formElement}>
          <label htmlFor='additional'>Dodatkowy opis</label>
          <input
            type='text'
            name='additional'
            onChange={handleChange}
            value={formData.additional}
          />
        </div>
      </form>
      <div className={"resultIndexContainer"}>
        <p className={"resultIndexToCopy"}>{indexName}</p>
        {<button 
          onClick={() => checkForm()}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>}
        {!isUndoOn && <button 
          onClick={clearForm}
          className={"resultIndexCopyBtn"}
        >
          <FaTrashCan />
        </button>}
        {isUndoOn && <button 
          onClick={undo}
          className={"resultIndexCopyBtn"}
        >
          <FaUndo />
        </button>}
      </div>
      {formErrorMessage && <ValidationErrorMessage message={formErrorMessage} />}
      {isShowTooltip && <Tooltip message={"Skopiowano do schowka!"} />}
    </div>
  )
}

export default BeamForm