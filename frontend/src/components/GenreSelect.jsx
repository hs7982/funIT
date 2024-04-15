import {Fragment, useEffect, useState} from 'react'
import {Combobox, Transition} from '@headlessui/react'
import {CheckIcon, ChevronUpDownIcon} from '@heroicons/react/20/solid'
import axios from "axios";

const people = [
    {id: 1, name: 'Wade Cooper'},
    {id: 2, name: 'Arlene Mccoy'},
    {id: 3, name: 'Devon Webb'},
    {id: 4, name: 'Tom Cook'},
    {id: 5, name: 'Tanya Fox'},
    {id: 6, name: 'Hellen Schmidt'},
]

const GenreSelect = () => {
    const [query, setQuery] = useState('')
    const [genres, setGenres] = useState([]);
    const [selected, setSelected] = useState(genres[0])

    const getGenres = async () => {
        const result = await axios({
            method: "GET",
            url: `/api/genres`,
            withCredentials: true,
            timeout: 5000,
        });

        return result.data;
    }

    const filteredGenre =
        query === ''
            ? genres
            : genres.filter((genre) =>
                genre.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            )

    useEffect(() => {
        getGenres().then(r => setGenres(r.data));
    }, []);

    return (
        <>

            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <div
                        className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            className="input input-bordered w-full"
                            placeholder="장르를 선택해주세요."
                            displayValue={(genre) => genre.name}
                            onChange={(event) => setQuery(event.target.value)}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center px-2 input-bordered">
                            <ChevronUpDownIcon
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery('')}
                    >
                        <Combobox.Options
                            className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                            {filteredGenre.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredGenre.map((genre) => (
                                    <Combobox.Option
                                        key={genre.id}
                                        className={({active}) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                            }`
                                        }
                                        value={genre}
                                    >
                                        {({selected, active}) => (
                                            <>
                        <span
                            className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {genre.name}
                        </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                    >
                            <CheckIcon className="h-5 w-5" aria-hidden="true"/>
                          </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </>
    )
};

export default GenreSelect;
