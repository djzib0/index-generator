
'use client'

// styles import
import { steelGrades } from "@/lib/data";
import styles from "./flatbarForm.module.css"
import { ReactNode, useEffect, useState } from "react";
import { convertDotToComa, createStringWithSingleWhiteSpaces, removeZeroCharFromNum } from "@/lib/utils";
import { CiLock } from "react-icons/ci";
import { FaUndo } from "react-icons/fa";
import { FaRegCopy, FaTrashCan } from "react-icons/fa6";
import ValidationErrorMessage from "@/components/validationErrorMessage/ValidationErrorMessage";
import Tooltip from "@/components/tooltip/Tooltip";

type FlatbarFormData = {
  name: string;
  width: number;
  thickness: number;
  gradeEU: string;
  gradeGer: string;
  additional: string;
}

const FlatbarForm = ({materialGradesArr} : {materialGradesArr: ReactNode[]}) => {
  const gradeOptionsArr = steelGrades.map((grade) => {
    return (
      <option key={grade.EuNorm + grade.GerNorm} value={grade.EuNorm}>{grade.EuNorm}</option>
    )
  })

  const initialFormData = {
    name: "Płaskownik",
    width: 0,
    thickness: 0,
    gradeEU: "",
    gradeGer: "",
    additional: "",
  }

  // state variables
  const [formData, setFormData] = useState<FlatbarFormData>(initialFormData);
  const [savedFormData, setSavedFormData] = useState<FlatbarFormData>(initialFormData)
  const [isUndoOn, setIsUndoOn] = useState(false);
  const [isBulb, setIsBulb] = useState(false);
  const [formErrorMessage, setFormErrorMessage] = useState<string>("");
  const [indexName, setIndexName] = useState("");
  const [isShowTooltip, setIsShowTooltip] = useState(false);
  const [isOwnGradeOn, setIsOwnGradeOn] = useState(false);

  useEffect(() => {
    const flatBarName = `${formData.name.toUpperCase()} ${isBulb ? "łeb." : ""}`
    const newIndexName = `${flatBarName.toUpperCase()} ${convertDotToComa(removeZeroCharFromNum(formData.width))} x ${convertDotToComa(formData.thickness)} ${formData.gradeEU.toUpperCase()} ${formData.additional.toUpperCase()}`
    setIndexName(createStringWithSingleWhiteSpaces(newIndexName))
  }, [formData, isBulb]);

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

  const toggleBulb = () => {
    setIsBulb(prevState => !prevState);
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
      parseFloat(formData.width.toString()) === 0 ||
      !formData.width 
    ) {
      setFormErrorMessage('Wymiar "długość" nie może być pusty lub równy 0')
      return
    }
    if (
      parseFloat(formData.width.toString()) < 0  
    ) {
      setFormErrorMessage('Wymiar "długość" nie może być ujemny')
      return
    }
    if (
      parseFloat(formData.thickness.toString()) === 0 ||
      !formData.thickness 
    ) {
      setFormErrorMessage('Wymiar "grubość" nie może być pusty lub równy 0')
      return
    }
    if (
      parseFloat(formData.thickness.toString()) < 0
    ) {
      setFormErrorMessage('Wymiar "grubość" nie może być ujemny')
      return
    }
    if (
      formData.gradeEU === ""
    ) {
      setFormErrorMessage(`Wybierz gatunek materiału`)
      return
    }
    if (
      parseFloat(formData.thickness.toString()) >= parseFloat(formData.width.toString())
    ) {
      setFormErrorMessage(`Wymiar "grubość" nie może być równy lub większy niż wymiar 'szerokość'`)
      return
    }
    setIsShowTooltip(true)
    copyToClipboard(indexName);
  }

  const copyToClipboard = (indexName: string) => {
    navigator.clipboard.writeText(indexName)
  }

  return (
    <div className={styles.formContainer}>
      <div className={styles.btnContainer}>
        <p>Kliknij aby wyłączyć lub włączyć.</p>
        <div className={styles.btns}>
          <button 
            type="button" 
            className={`${styles.toggleBtn} ${isBulb ? styles.btnOn : styles.btnOff}`}
            onClick={toggleBulb}
            >
            ŁEBKOWY
          </button>

        </div>
      </div>
      <form className={styles.form}>
        <div className={styles.formElement}>
          <label htmlFor='name'>Nazwa<span className={styles.lockIcon}><CiLock /></span></label>
          <input
            type='text'
            name='name'
            // onChange={handleChange}
            readOnly
            value={formData.name}
            disabled
          />
        </div>
        <div className={styles.formElement}>
          <label htmlFor='width'>Szerokość [mm]</label>
          <input
            type='number'
            name='width'
            onChange={handleChange}
            value={formData.width}
            min={0}
          />
        </ div>
        <div className={styles.formElement}>
          <label htmlFor='thickness'>Grubość [mm]</label>
          <input
            type='number'
            name='thickness'
            onChange={handleChange}
            value={formData.thickness}
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
        <button 
          onClick={() => checkForm()}
          className={"resultIndexCopyBtn"}
        >
          <FaRegCopy />
        </button>
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

export default FlatbarForm