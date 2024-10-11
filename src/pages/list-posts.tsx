import React from 'react'
import { Link } from 'react-router-dom'

interface ListPost {
  postName: string
  members: string
  techName: string
  firstName: string
  lastName: string
}

const ListPosts: React.FC = () => {
  const posts: ListPost[] = [
    {
      postName: 'Post Name 1',
      members: '3/5',
      techName: 'Java',
      firstName: 'John',
      lastName: 'Han'
    },
    {
      postName: 'Post Name 2',
      members: '4/5',
      techName: 'JavaScript',
      firstName: 'Jane',
      lastName: 'Doe'
    },
    {
      postName: 'Post Name 3',
      members: '2/5',
      techName: 'C',
      firstName: 'Alice',
      lastName: 'Smith'
    },
    {
      postName: 'Post Name 4',
      members: '5/5',
      techName: 'C#',
      firstName: 'Bob',
      lastName: 'Johnson'
    },
    {
      postName: 'Post Name 5',
      members: '1/5',
      techName: 'Python',
      firstName: 'Tom',
      lastName: 'Brown'
    },
    {
      postName: 'Post Name 6',
      members: '3/5',
      techName: 'C',
      firstName: 'Emily',
      lastName: 'Davis'
    }
  ]

  return (
    <div>
      <h1 style={{ fontSize: '30px', fontWeight: '600', marginBottom: '30px' }}>View Posts</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)' }}>
        {posts.map((post, index) => (
          <div key={index} style={{ margin: '10px', padding: '10px', backgroundColor: '#f7f7f7', borderRadius: '5px' }}>
            <Link to='/post-detail'>
              <div style={{ backgroundColor: '#cfd3d6', padding: '10px', borderRadius: '5px' }}>
                <h4
                  style={{
                    fontWeight: '600',
                    fontSize: '20px',
                    marginBottom: '10px',
                    display: 'flex',
                    justifyContent: 'center'
                  }}
                >
                  <span style={{ fontSize: '18px', fontWeight: '500' }}>{post.postName}</span>
                </h4>
                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '10px' }}>
                  Name:{' '}
                  <span style={{ fontSize: '15px', fontWeight: '500' }}>
                    {post.firstName} {post.lastName}
                  </span>
                </p>
                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '10px' }}>
                  Member: <span style={{ fontSize: '15px', fontWeight: '500' }}>{post.members}</span>
                </p>
                <p style={{ fontWeight: '500', fontSize: '20px', marginBottom: '10px' }}>
                  Technology: <span style={{ fontSize: '15px', fontWeight: '500' }}>{post.techName}</span>
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ListPosts
