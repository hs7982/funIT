import {Fragment, useEffect, useState} from "react";
import {Combobox, Transition} from "@headlessui/react";
import {CheckIcon, ChevronUpDownIcon} from "@heroicons/react/20/solid";
import axios from "axios";

const GenreSelect = (props) => {
    const [genres, setGenres] = useState([]);
    const [selected, setSelected] = useState([]);

    const getGenres = async () => {
        const result = await axios({
            method: "GET",
            url: `/api/genres`,
            withCredentials: true,
            timeout: 5000,
        });
        return result.data;
    };

    const selectGenre = (select) => {
        if (checkSelected(select)) {
            // 이미 선택된 항목인 경우 배열에서 제거
            setSelected((prevData) =>
                prevData.filter((item) => item.id !== select.id)
            );
        } else {
            // 선택되지 않은 항목인 경우 배열에 추가
            setSelected((prevData) => [...prevData, select]);
        }
    };

    const checkSelected = (target) => {
        return !!selected.find((item) => item.id === target.id);
    };

    useEffect(() => {
        getGenres().then((r) => setGenres(r.data));
    }, []);

    useEffect(() => {
        const selectedIds = selected.map(item => item.id);
        props.updateGenre(selectedIds);
    }, [selected]);

    useEffect(() => {
        if (props.oriSelect) {
            const selectedGenres = genres.filter(genre => props.oriSelect.includes(genre.id));
            setSelected(selectedGenres);
            setSelected(selectedGenres);
        }

    }, [genres]);

    return (
        <div>
            <div className="relative mt-1">
                <Combobox>
                    <Combobox.Button className={"input input-bordered w-full"}>
                        <Combobox.Input
                            className="w-full"
                            placeholder={props.oriSelect ? "(수정하지 않음)" : "장르"}
                            displayValue={() => selected.map((sel) => sel.name).join(", ")}
                            readOnly
                        />
                    </Combobox.Button>
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 input-bordered">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {genres.map((genre) => (
                                <Combobox.Option
                                    key={genre.id}
                                    className={({active}) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                            (active || checkSelected(genre)) ? "bg-teal-600 text-white" : "text-gray-900"
                                        }`
                                    }
                                    value={genre}
                                    onClick={() => selectGenre(genre)}
                                >
                  <span
                      className={`block truncate ${
                          checkSelected(genre) ? "font-medium" : "font-normal"
                      }`}
                  >
                    {genre.name}
                  </span>
                                    {checkSelected(genre) ? (
                                        <span
                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                checkSelected(genre) ? "text-white" : "text-teal-600"
                                            }`}
                                        >
                      <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                    </span>
                                    ) : null}
                                </Combobox.Option>
                            ))}
                        </Combobox.Options>
                    </Transition>
                </Combobox>
            </div>
        </div>
    );
};

export default GenreSelect;
