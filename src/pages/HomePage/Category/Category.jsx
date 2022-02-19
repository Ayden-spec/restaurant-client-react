import './category.css'

const Category = (props) => {

    /*
    const [Visible_block, SetVisible_block] = useState(true);

    ////////////////////////////////////////////////////////////////////////////////////////
    const Visible = () => {
        // Все позиции элемента
        try {
            let targetPosition = {
                top: window.pageYOffset + document.querySelector('#homepage_nav_menu_block').getBoundingClientRect().top,
                left: window.pageXOffset + document.querySelector('#homepage_nav_menu_block').getBoundingClientRect().left,
                right: window.pageXOffset + document.querySelector('#homepage_nav_menu_block').getBoundingClientRect().right,
                bottom: window.pageYOffset + document.querySelector('#homepage_nav_menu_block').getBoundingClientRect().bottom
            },
                // Получаем позиции окна
                windowPosition = {
                    top: window.pageYOffset,
                    left: window.pageXOffset,
                    right: window.pageXOffset + document.documentElement.clientWidth,
                    bottom: window.pageYOffset + document.documentElement.clientHeight
                };

            if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
                targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
                targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
                targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа
                // Если элемент полностью видно, то запускаем следующий код
                //console.clear();
                //console.log('Вы видите элемент :)');
                if (Visible_block) { return }
                SetVisible_block(true)
            } else {
                // Если элемент не видно, то запускаем этот код
                //console.clear();
                //console.log(':(');
                if (!Visible_block) { return }
                SetVisible_block(false)
            };
        } catch (err) {
            console.log(err)
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////


    useEffect(() => {
        window.addEventListener('scroll', function () {
            Visible();
        });
    }, []);
    Visible();*/



    const clickmenu = (id) => {
        props.setValue(id)
        document.getElementById(`object_block_${id}`).scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    }
    return (
        <div className="homepage_nav_menu_block_visible" id='homepage_nav_menu_block'>
            <div className="homepage_nav_menu">
                {
                    props.array.map((element, index) => (
                        <div key={`category_id_${index}`} onClick={() => clickmenu(index)} className={props.value === index ? 'homepage_nav_menu_object homepage_nav_menu_object_active' : 'homepage_nav_menu_object'}>{element.category_name}</div>
                    ))
                }
            </div>
        </div>
    )
}
export default Category