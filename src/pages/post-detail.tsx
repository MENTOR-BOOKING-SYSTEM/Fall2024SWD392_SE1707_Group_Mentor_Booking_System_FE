import { Button } from '@nextui-org/button'
import React from 'react'
import { Link } from 'react-router-dom'

interface PostDetail {
  postName: string
  description: string
  projectName: string
  slug: string
  funcRequirements: string
  nonFuncRequirements: string
  context: string
  actors: string
  problems: string
  members: string
  techName: string
  firstName: string
  lastName: string
}

const PostDetail: React.FC = () => {
  const posts: PostDetail[] = [
    {
      postName: 'Post Name 1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quibusdam eos! Alias recusandae veritatis amet corporis porro possimus iure. Quas eum optio atque. Suscipit minus quam nemo, reiciendis dolore totam.',
      projectName: 'Project Name',
      slug: 'post_name_1',
      funcRequirements:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quibusdam eos! Alias recusandae veritatis amet corporis porro possimus iure. Quas eum optio atque. Suscipit minus quam nemo, reiciendis dolore totam.',
      nonFuncRequirements:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quibusdam eos! Alias recusandae veritatis amet corporis porro possimus iure. Quas eum optio atque. Suscipit minus quam nemo, reiciendis dolore totam.',
      context:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quibusdam eos! Alias recusandae veritatis amet corporis porro possimus iure. Quas eum optio atque. Suscipit minus quam nemo, reiciendis dolore totam.',
      actors: 'John',
      problems:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro, quibusdam eos! Alias recusandae veritatis amet corporis porro possimus iure. Quas eum optio atque. Suscipit minus quam nemo, reiciendis dolore totam.',
      members: '2/5',
      techName: 'Java',
      firstName: 'Alice',
      lastName: 'Smith'
    }
  ]

  const post = posts[0] 

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#fff'
      }}
    >
      <h1
        style={{
          fontSize: '24px',
          marginBottom: '10px'
        }}
      >
        {post.postName}
      </h1>

      <h3
        style={{
          fontSize: '20px',
          color: '#555',
          marginBottom: '15px'
        }}
      >
        {post.projectName}
      </h3>

      <p
        style={{
          fontSize: '16px',
          lineHeight: '1.5',
          marginBottom: '20px'
        }}
      >
        {post.description}
      </p>

      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '16px' }}>
          <strong>Technology:</strong> {post.techName}
        </p>
        <p style={{ fontSize: '16px' }}>
          <strong>Members:</strong> {post.members}
        </p>
        <p style={{ fontSize: '16px' }}>
          <strong>Actors:</strong> {post.actors}
        </p>

        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Functional Requirements:</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.funcRequirements}</p>

        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Non-Functional Requirements:</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.nonFuncRequirements}</p>

        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Context:</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.context}</p>

        <h4 style={{ marginTop: '20px', marginBottom: '5px' }}>Problems:</h4>
        <p style={{ fontSize: '16px', lineHeight: '1.5' }}>{post.problems}</p>
      </div>

      <div
        style={{
          borderTop: '1px solid #eee',
          paddingTop: '10px'
        }}
      >
        <p style={{ fontSize: '16px' }}>
          <strong>Author:</strong> {post.firstName} {post.lastName}
        </p>
      </div>

      <div className='CreatePost_Button' style={{ marginTop: '30px', display: 'flex', gap: '30px' }}>
        <Button color='default' type='button'>
          Back to Home
        </Button>
        <Button color='primary' type='submit'>
          <Link to='/list-post'>Back to View Posts</Link>
        </Button>
      </div>
    </div>
  )
}

export default PostDetail
