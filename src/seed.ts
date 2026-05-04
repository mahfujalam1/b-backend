import { User } from './app/modules/user/user-model';
import { TUser } from './app/modules/user/user-interface';

export async function seedAdmin() {
  try {
    const adminData: Partial<TUser> = {
      name: 'Mahfuj Alam',
      email: 'mahfujalam5795@gmail.com',
      password: 'mahfuj123',
      role: 'admin',
      isBlocked: false,
      isDeleted: false,
      isVerified: true
    };

    const isExist = await User.findOne({ email: adminData.email });
    
    if (isExist) {
      console.log('✅ Admin user already exists in database');
    } else {
      await User.create(adminData);
      console.log('🚀 Default Admin user created successfully!');
    }
  } catch (error) {
    console.log('❌ Error seeding database:', error);
  }
}
