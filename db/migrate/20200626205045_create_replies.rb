class CreateReplies < ActiveRecord::Migration[5.2]
  def change
    create_table :replies do |t|
      t.text :content
      t.string :username
      t.integer :user_id
      t.integer :comment_id
      t.timestamps
    end
    add_index :replies, :comment_id
  end
end
