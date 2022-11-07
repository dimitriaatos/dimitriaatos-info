import { gql } from '@apollo/client'

const GET_WORKS = gql`
	query GetWorks {
		works(pagination: { pageSize: 20 }) {
			data {
				id
				attributes {
					title
					cover {
						data {
							attributes {
								alternativeText
								formats
							}
						}
					}
					slug
					categories {
						data {
							id
						}
					}
				}
			}
		}
	}
`

const GET_WORK_BY_SLUG = gql`
	query GetWorkBySlug($slug: String!) {
		findSlug(slug: $slug, modelName: "work", publicationState: "live") {
			... on WorkEntityResponse {
				data {
					attributes {
						title
						description
						embed
						technologies {
							data {
								id
								attributes {
									title
								}
							}
						}
						credits {
							contribution {
								data {
									id
									attributes {
										title
									}
								}
							}
							collaborators {
								data {
									id
									attributes {
										firstNames
										lastNames
										contact {
											id
											title
											link
										}
									}
								}
							}
						}
						image {
							data {
								attributes {
									alternativeText
									formats
								}
							}
						}
						links {
							id
							title
							link
						}
					}
				}
			}
		}
	}
`

const GET_CATEGORIES = gql`
	query GetCategories {
		categories {
			data {
				id
				attributes {
					title
				}
			}
		}
	}
`

const GET_ABOUT = gql`
	query GetAbout {
		about {
			data {
				attributes {
					title
					description
					contact {
						id
						title
						link
					}
					photo {
						data {
							attributes {
								formats
								alternativeText
							}
						}
					}
					cv {
						data {
							attributes {
								url
							}
						}
					}
					fallbackImage {
						data {
							attributes {
								formats
								alternativeText
							}
						}
					}
				}
			}
		}
	}
`

export { GET_WORKS, GET_WORK_BY_SLUG, GET_CATEGORIES, GET_ABOUT }
