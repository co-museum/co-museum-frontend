import {Button, Divider, IconButton} from "@mui/material";
import {useContext} from "react";
import DialogContext from "../../context/DialogContext";
import {QuestionMarkType} from "../../constants/QuestionMarkType";
import strings from "../../localization";


const QuestionMark = ({title = 'lorem', description = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`, type=QuestionMarkType.GREY, btnClass = ''}) => {
    const {initDialog} = useContext(DialogContext);


    const openDialog = () => {
        initDialog({
            title: title,
            titleClass: 'font-20',
            content: <>
                <Divider className={'mt-1 mx-m'}/>
                <div className={'mt-1'}>{description}</div>
                <Divider className={'mt-1 mx-m'}/>
                <Button className={'black-white-button bordered w-100 mt-1'}>{strings.common.learnMore}</Button>
            </>
        })
    }


    return <IconButton onClick={() => openDialog()} className={'question-mark-btn '+ btnClass}>
        {
            type === QuestionMarkType.GREY &&
            <img src="/images/question-mark.svg" className={'image-12x12'}/>
        }
        {
            type === QuestionMarkType.WHITE &&
            <img src="/images/question-mark-white.svg" className={'image-12x12'}/>
        }
    </IconButton>


}

export default QuestionMark;