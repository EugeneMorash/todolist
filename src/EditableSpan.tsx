import React, { ChangeEvent, KeyboardEvent, useState } from 'react';


type PropsType = {
    children: string
    // children: React.ReactNode
    onChangeTitle: (value: string) => void
}


// children

export const EditableSpan: React.FC<PropsType> = (
    {
        children,
        onChangeTitle
    }
) => {


    const [value, setValue] = useState(children)

    const [isEdit, setIsEdit] = useState(false)
    const onDoubleClickHandler = () => {
        setIsEdit(true)
    }

    const onBlurHandler = () => {
        setIsEdit(false)
        onChangeTitle(value)
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    };

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onBlurHandler()
        }
    };

    return (
        <>
            {
                isEdit ?
                    <input type="text"
                        onBlur={onBlurHandler}
                        onChange={onChangeHandler}
                        onKeyDown={onEnterHandler}
                        value={value}
                        autoFocus
                    /> :
                    <span onDoubleClick={onDoubleClickHandler}>
                        {value}
                    </span>
            }
        </>
    );
}

// Редактируемый span
// 1. Вернуть span или input (условный рендеринг)
// 2. Что изначально отрисовано? span
// 3. Когда будет input, вместо span? Когда кликнули 2 раза по span

// 4. Вешаем прослушку на span onDoubleClick={callback}
// 5. Необходима переменная, которая будет менять условный рендер по клику -> useState
// 6. В callback прописываем setIsEdit(true) - т.к. по дабл-клику мы только включаем режим редактирования
// 7. Теперь в зависимости от isEdit сделаем условный рендер span или input

// 8. А как выйти из режима редактирования? onBlur
// 9. Как сделать, чтобы фокус сразу попал в input? атрибут autoFocus
// 10. * Дополнительно: Добавить выход из режима по нажатию на Enter

// 11. Сейчас текст редактируемый захаркожен, а мы хотим получить текст извне: props / children

// 12. При изменении текста он не сохраняется: вспоминает flux-круговорот
// const [value, setValue] = useState(String(children))

// 13. Теперь в span запишем не children, а value
// 14. А также в <input value={value}/> чтобы при редактировании текст попал в input
// 15. Т.к. мы захардкодили value дописывать туда ничего не можем, необходимо для этого использовать onChange -> useSTate (flux-круговорот)
// Контролируемый input

// 16. Сейчас кажется, что компонента готова, но она неконтролируемая -> т.е. компонента должна контролироваться внешним стейтом, т.е. получать результирующие данные
// 17. Чтобы данные отправить наверх, необходимо получить функцию, в которую мы отправим результирующие данные
// 18. Но сама компонента не должна знать, какой из глобальных стейтов мы обновляем
// Ожидаем по пропсу onChangeTitle: (value: string) => void

// 19. На уровень выше мы должны передать функцию в наш компонент
// Функция, которая изменит тот state, который мы хотим

